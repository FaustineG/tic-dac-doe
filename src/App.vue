<script setup lang="ts">
import { useGame } from './game'
import Grid from './Grid.vue'

const { gameArray, hasWon, isGameFinished, resetArray, play } = useGame()

const onClick = (i: number, j: number) => play(i, j)
</script>

<template>
  <h1>Tic Dac Doe</h1>

  <Grid :game-array="gameArray" @click="onClick" />

  <div class="game-over-info">
    <template v-if="isGameFinished">
      Game over !

      <div v-if="hasWon('X')">You have won !</div>
      <div v-else-if="hasWon('O')">You have lost :(</div>
      <div v-else>Nobody won</div>

      <button @click="resetArray">Reset</button>
    </template>
  </div>
</template>

<style lang="scss">
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.game-over-info {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

button {
  border-radius: 5px;
  padding: 5px;
  background: white;
  border-style: none;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
}
</style>
