import { describe, expect, it } from 'vitest'
import { useGameHelper } from './game.helper'

const { rowIsComplete, colIsComplete } = useGameHelper()

const emptyArrayMock = [
  ['', ''],
  ['', ''],
]
const partialArrayMock = [
  ['X', ''],
  ['', ''],
]

describe('game.helper', () => {
  describe.skip('rowIsComplete', () => {
    it('should find empty row not complete', () => {
      expect(rowIsComplete(emptyArrayMock, 0, 'X')).toBeFalsy()
    })
    it('should find partial row not complete', () => {
      expect(rowIsComplete(partialArrayMock, 0, 'X')).toBeFalsy()
    })
    it('should find complete row complete', () => {
      const gameArray = [
        ['X', 'X'],
        ['', ''],
      ]
      expect(rowIsComplete(gameArray, 0, 'X')).toBeTruthy()
    })
  })

  describe.skip('colIsComplete', () => {
    it('should find empty column not complete', () => {
      expect(colIsComplete(emptyArrayMock, 0, 'X')).toBeFalsy()
    })

    it('should find complete column complete', () => {
      const gameArray = [
        ['X', ''],
        ['X', ''],
      ]
      expect(colIsComplete(gameArray, 0, 'X')).toBeTruthy()
    })

    it('should find partial column not complete', () => {
      expect(colIsComplete(partialArrayMock, 0, 'X')).toBeFalsy()
    })
  })
})
