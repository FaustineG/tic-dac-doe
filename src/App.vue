<script setup lang="ts">
import { computed, ref } from 'vue'

const size = 3

const gameArray = ref(Array.from(Array(size), () => new Array(size).fill('')))
const flattenedGameArray = computed(() =>
  gameArray.value.flatMap((row, i) => {
    return row.map((cell, j) => {
      return { i, j, cell }
    })
  }),
)

const botPlay = () => {
  const allPossiblePositions = flattenedGameArray.value.reduce(
    (acc, val) => (val.cell === '' ? [...acc, { i: val.i, j: val.j }] : acc),
    [] as { i: number; j: number }[],
  )
  const random = allPossiblePositions[Math.floor(Math.random() * allPossiblePositions.length)]
  setTimeout(() => {
    gameArray.value[random.i][random.j] = 'O'
  }, 300)
}

const playTurn = (i: number, j: number) => {
  gameArray.value[i][j] = 'X'
  botPlay()
}

const onClick = (i: number, j: number) => {
  if (gameArray.value[i][j] === '') playTurn(i, j)
}

</script>

<template>
  <main>
    <h1>Tic Dac Doe</h1>
    <div class="grid">
      <template v-for="(n, i) of size" :key="i">
        <template v-for="(m, j) of size" :key="i + ',' + j">
          <input
            type="text"
            class="cell"
            data-cy="cell"
            readonly
            @click="onClick(i, j)"
            :value="gameArray[i][j]"
          />
        </template>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  width: fit-content;
  .cell {
    border: none;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    text-align: center;
    cursor: pointer;
    border-radius: 5%;
  }
  .cell:active {
    outline: none;
  }
}
</style>
