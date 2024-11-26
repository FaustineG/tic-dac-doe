import { describe, expect, it } from 'vitest'
import { useGame } from './game'

const { gameArray } = useGame()

describe('game', () => {
  it('should init an empty game array', () => {
    expect(gameArray.value).toStrictEqual([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
  })
})
