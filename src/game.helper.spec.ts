import { describe, expect, it, test } from 'vitest'
import { useGameHelper } from './game.helper'
import type { Player } from './player'

const { rowIsComplete, colIsComplete, flattenGameArray, diag1IsComplete } = useGameHelper()

describe('game.helper', () => {
  describe('rowIsComplete', () => {
    it('should find empty row not complete', () => {
      expect(rowIsComplete([['', '']], 0, 'X')).toBeFalsy()
    })
    it('should find partial row not complete', () => {
      expect(rowIsComplete([['X', '']], 0, 'X')).toBeFalsy()
    })
    it('should find complete row complete', () => {
      expect(rowIsComplete([['X', 'X']], 0, 'X')).toBeTruthy()
    })
  })

  describe('colIsComplete', () => {
    it('should find empty column not complete', () => {
      expect(
        colIsComplete(
          [
            ['', ''],
            ['', ''],
          ],
          0,
          'X',
        ),
      ).toBeFalsy()
    })
    it('should find partial column not complete', () => {
      expect(
        colIsComplete(
          [
            ['X', ''],
            ['', ''],
          ],
          0,
          'X',
        ),
      ).toBeFalsy()
    })
    it('should find complete column complete', () => {
      expect(
        colIsComplete(
          [
            ['X', ''],
            ['X', ''],
          ],
          0,
          'X',
        ),
      ).toBeTruthy()
    })
  })

  describe('diag1IsComplete', () => {
    test.each([
      [
        [
          ['X', ''],
          ['', 'X'],
        ],
        'X' as Player,
        true,
      ],
      [
        [
          ['', 'O'],
          ['O', ''],
        ],
        'O' as Player,
        false,
      ],
    ])('coucou', (gameArray: string[][], player: Player, expected: boolean) => {
      expect(diag1IsComplete(gameArray, player)).toStrictEqual(expected)
    })
  })
  describe.todo('diag2IsComplete', () => {})

  describe('flattenGameArray', () => {
    it('should flatten a game array', () => {
      expect(
        flattenGameArray([
          ['X', 'O'],
          ['', 'O'],
        ]),
      ).toEqual([
        { i: 0, j: 0, cell: 'X' },
        { i: 0, j: 1, cell: 'O' },
        { i: 1, j: 0, cell: '' },
        { i: 1, j: 1, cell: 'O' },
      ])
    })
  })
})
