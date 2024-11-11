<script setup lang="ts">
import { computed, ref } from 'vue'

type Player = 'X' | 'O'

const size = 3

const gameArray = ref(Array.from(Array(size), () => new Array(size).fill('')))
const flattenedGameArray = computed(() =>
  gameArray.value.flatMap((row, i) => {
    return row.map((cell, j) => {
      return { i, j, cell }
    })
  }),
)

const rowIsComplete = (rowIndex: number, player: Player) =>
  gameArray.value[rowIndex].reduce((acc, val) => acc && val === player, true)

const colIsComplete = (colIndex: number, player: Player) =>
  gameArray.value.reduce((acc, val) => acc && val[colIndex] === player, true)

const diag1 = (player: Player) => {
  let isDone = true
  for (let i = 0; i < size; i++) {
    isDone = isDone && gameArray.value[i][i] === player
  }
  return isDone
}
const diag2 = (player: Player) => {
  let isDone = true
  for (let i = 0; i < size; i++) {
    isDone = isDone && gameArray.value[i][size - i - 1] === player
  }
  return isDone
}

const hasWon = (player: Player) => {
  for (let i = 0; i < size; i++) {
    if (rowIsComplete(i, player)) return true
    if (colIsComplete(i, player)) return true
    if (diag1(player)) return true
    if (diag2(player)) return true
  }

  return false
}
const isGameFinished = computed(() => {
  const noCellsLeft = flattenedGameArray.value.filter((item) => item.cell === '').length === 0

  return noCellsLeft || hasWon('X') || hasWon('O')
})

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
  if (!isGameFinished.value) gameArray.value[i][j] = 'X'
  if (!isGameFinished.value) botPlay()
}

const onClick = (i: number, j: number) => {
  if (gameArray.value[i][j] === '') playTurn(i, j)
}

const resetGame = () => {
  gameArray.value = Array.from(Array(size), () => new Array(size).fill(''))
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
    <div class="game-over-info">
      <div v-show="isGameFinished">
        Game over !
        <div v-if="hasWon('X')">You have won !</div>
        <div v-else-if="hasWon('O')">You have lost :(</div>
        <div v-else>Nobody won</div>
        <button @click="resetGame">Reset</button>
      </div>
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

.game-over-info {
  height: 200px;
}
</style>
