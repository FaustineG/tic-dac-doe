import { computed, ref } from 'vue'
import type { Player } from './player'
import { useGameHelper } from './game.helper'

export const useGame = (size = 3) => {
  const { colIsComplete, diag1IsComplete, diag2IsComplete, flattenGameArray, rowIsComplete } =
    useGameHelper()

  // game array
  const gameArray = ref(Array.from(Array(size), () => new Array(size).fill('')))

  const flattenedGameArray = computed(() => flattenGameArray(gameArray.value))

  const resetArray = () => {
    gameArray.value = Array.from(Array(size), () => new Array(size).fill(''))
  }

  // victory conditions
  const _gameRowIsComplete = (rowIndex: number, player: Player) =>
    rowIsComplete(gameArray.value, rowIndex, player)

  const _gameColIsComplete = (colIndex: number, player: Player) =>
    colIsComplete(gameArray.value, colIndex, player)

  const _diag1 = (player: Player) => diag1IsComplete(gameArray.value, player)
  const _diag2 = (player: Player) => diag2IsComplete(gameArray.value, player)

  const hasWon = (player: Player) => {
    for (let i = 0; i < size; i++) {
      if (_gameRowIsComplete(i, player)) return true
      if (_gameColIsComplete(i, player)) return true
      if (_diag1(player)) return true
      if (_diag2(player)) return true
    }

    return false
  }
  
  const isGameFinished = computed(() => {
    const noCellsLeft = flattenedGameArray.value.filter((item) => item.cell === '').length === 0
    
    return noCellsLeft || hasWon('X') || hasWon('O')
  })
  
  const _botPlay = () => {
    const allPossiblePositions = flattenedGameArray.value.reduce(
      (acc, val) => (val.cell === '' ? [...acc, { i: val.i, j: val.j }] : acc),
      [] as { i: number; j: number }[],
    )
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
    _gameColIsComplete,
    _gameRowIsComplete,
    _diag1,
    _diag2,
  }
}
