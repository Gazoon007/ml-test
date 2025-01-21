import TextBlock from '@/components/blocks/TextBlock.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock Tiptap component
vi.mock('@/components/Tiptap.vue', () => ({
  default: {
    name: 'Tiptap',
    props: ['content'],
    template: '<div>{{ content }}</div>',
  },
}))

describe('textBlock.vue', () => {
  const createWrapper = (props = {}) => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        blocks: {
          blocks: [{
            id: '1',
            type: 'TextBlock',
            content: 'Test content',
            styleProperty: {
              topPadding: 10,
              bottomPadding: 10,
              backgroundColor: '#ffffff',
            },
          }],
        },
      },
    })

    return mount(TextBlock, {
      props: {
        index: 0,
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    })
  }

  it('renders content correctly', async () => {
    const wrapper = createWrapper()
    await wrapper.vm.$nextTick() // Wait for reactivity
    expect(wrapper.text()).toContain('Test content')
  })

  it('applies correct styling', () => {
    const wrapper = createWrapper()
    const container = wrapper.find('div')
    const style = container.attributes('style')
    expect(style).toContain('padding: 10px 10px 10px 10px')
    expect(style).toContain('background-color: rgb(255, 255, 255)')
  })
})
