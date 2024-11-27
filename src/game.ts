import { computed, ref, type Ref } from 'vue'
import type { Player } from './player'
import { useGameHelper } from './game.helper'

export const useGame = (size = 3) => {
  const { colIsComplete, rowIsComplete } = useGameHelper()

  // game array
  const gameArray: Ref<string[][]> = ref(Array.from(Array(size), () => new Array(size).fill('')))

  const flattenedGameArray = computed(() =>
    gameArray.value.flatMap((row, i) => {
      return row.map((value, j) => {
        return { i, j, value }
      })
    }),
  )

  const resetArray = () => {
    gameArray.value = Array.from(Array(size), () => new Array(size).fill(''))
  }

  // victory conditions
  const hasWon = (player: Player) => {
    for (let i = 0; i < size; i++) {
      if (rowIsComplete(gameArray.value, i, player)) return true
      if (colIsComplete(gameArray.value, i, player)) return true
    }

    return false
  }

  const isGameFinished = computed(() => {
    const noCellsLeft = flattenedGameArray.value.filter((item) => item.value === '').length === 0

    return noCellsLeft || hasWon('X') || hasWon('O')
  })

  // play

  const _botPlay = () => {
    const allPossiblePositions = flattenedGameArray.value.filter((item) => item.value === '')
    const random = allPossiblePositions[Math.floor(Math.random() * allPossiblePositions.length)]
    setTimeout(() => {
      gameArray.value[random.i][random.j] = 'O'
    }, 300)
  }

  const play = (i: number, j: number) => {
    if (gameArray.value[i][j] === '') {
      if (!isGameFinished.value) gameArray.value[i][j] = 'X'
      if (!isGameFinished.value) _botPlay()
    }
  }

  return {
    gameArray,
    hasWon,
    isGameFinished,
    resetArray,
    play,
    _botPlay,
  }
}
