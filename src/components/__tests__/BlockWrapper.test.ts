import BlockWrapper from '@/components/BlockWrapper.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('blockWrapper.vue', () => {
  const createWrapper = (props = {}) => {
    return mount(BlockWrapper, {
      props: {
        index: 0,
        ...props,
      },
      slots: {
        default: '<div>Test content</div>',
      },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })],
      },
    })
  }

  it('renders slot content', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Test content')
  })

  it('shows control panel on hover', async () => {
    const wrapper = createWrapper()
    await wrapper.trigger('mouseover')
    const controlPanel = wrapper.find('.absolute')
    expect(controlPanel.exists()).toBe(true)
  })

  it('hides control panel on mouse leave', async () => {
    const wrapper = createWrapper()
    await wrapper.trigger('mouseover')
    await wrapper.trigger('mouseleave')
    const controlPanel = wrapper.find('.absolute')
    expect(controlPanel.exists()).toBe(false)
  })
})
