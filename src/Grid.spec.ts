import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from './Grid.vue'

describe('Grid component', () => {
  it('should mount', () => {
    const wrapper = mount(Grid, {
      props: {
        gameArray: [
          ['X', ''],
          ['', ''],
        ],
      },
    })
    expect(wrapper.html()).toContain('X')
  })
})
