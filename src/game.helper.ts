import type { Player } from './player'

export const useGameHelper = (size = 3) => {
  const flattenGameArray = (gameArray: string[][]) =>
    gameArray.flatMap((row, i) => {
      return row.map((cell, j) => {
        return { i, j, cell }
      })
    })

  const rowIsComplete = (gameArray: string[][], rowIndex: number, player: Player) =>
    gameArray[rowIndex].reduce((acc, val) => acc && val === player, true)

  const colIsComplete = (gameArray: string[][], colIndex: number, player: Player) =>
    gameArray.reduce((acc, val) => acc && val[colIndex] === player, true)

  const diag1IsComplete = (gameArray: string[][], player: Player) => {
    let isDone = true
    for (let i = 0; i < gameArray.length; i++) {
      isDone = isDone && gameArray[i][i] === player
    }
    return isDone
  }

  const diag2IsComplete = (gameArray: string[][], player: Player) => {
    let isDone = true
    for (let i = 0; i < gameArray.length; i++) {
      isDone = isDone && gameArray[i][size - i - 1] === player
    }
    return isDone
  }

  return { rowIsComplete, colIsComplete, diag1IsComplete, diag2IsComplete, flattenGameArray }
}
