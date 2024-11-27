import type { Player } from './player'

export const useGameHelper = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rowIsComplete = (gameArray: string[][], rowIndex: number, player: Player) => {
    return false
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const colIsComplete = (gameArray: string[][], colIndex: number, player: Player) => {
    return false
  }

  return { rowIsComplete, colIsComplete }
}
