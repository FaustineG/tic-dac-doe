<template>
  <div class="grid">
    <template v-for="(n, i) of gameArray.length" :key="i">
      <template v-for="(m, j) of gameArray.length" :key="i + ',' + j">
        <input
          type="text"
          class="cell"
          data-cy="cell"
          readonly
          @click="() => onClick(i, j)"
          :value="gameArray[i][j]"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ gameArray: string[][] }>()
const emits = defineEmits<{
  click: [i: number, j: number]
}>()

const onClick = (i: number, j: number) => emits('click', i, j)

</script>
<style lang="scss" scoped>
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
