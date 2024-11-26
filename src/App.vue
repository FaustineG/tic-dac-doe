<script setup lang="ts">
import { useGame } from './game'
import Grid from './Grid.vue'

const size = 3
const { gameArray, hasWon, isGameFinished, resetArray, play } = useGame(size)

const onClick = (i: number, j: number) => play(i, j)
</script>

<template>
  <main>
    <h1>Tic Dac Doe</h1>
    <Grid :game-array="gameArray" @click="onClick"/>
    <div class="game-over-info">
      <div v-show="isGameFinished">
        Game over !
        <div v-if="hasWon('X')">You have won !</div>
        <div v-else-if="hasWon('O')">You have lost :(</div>
        <div v-else>Nobody won</div>
        <button @click="resetArray">Reset</button>
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

.game-over-info {
  height: 200px;
}
</style>
