import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from './Grid.vue'

describe('Grid component', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Grid, {
      props: {
        gameArray: [
          ['X', ''],
          ['', 'O'],
        ],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  
  it('should display the game array', () => {
    const wrapper = mount(Grid, {
      props: {
        gameArray: [
          ['X', ''],
          ['', 'O'],
        ],
      },
    })
    expect(
      wrapper.findAll('[data-cy="cell"]').map((e) => (e.element as HTMLInputElement).value),
    ).toStrictEqual(['X', '', '', 'O'])
  })

  it('should emit event on click', async () => {
    const wrapper = mount(Grid, {
      props: {
        gameArray: [
          ['', ''],
          ['', ''],
        ],
      },
    })
    expect(
      wrapper.findAll('[data-cy="cell"]').map((e) => (e.element as HTMLInputElement).value),
    ).toStrictEqual(['', '', '', ''])
    await wrapper.findAll('[data-cy="cell"]')[0].trigger('click')
    expect(wrapper.emitted()['click']).toHaveLength(1)
  })
})
