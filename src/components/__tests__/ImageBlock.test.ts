import ImageBlock from '@/components/blocks/ImageBlock.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('imageBlock.vue', () => {
  const createWrapper = (props = {}) => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        blocks: {
          blocks: [{
            id: '1',
            type: 'ImageBlock',
            links: ['/mailerlite-family-photos/1.jpg', '/mailerlite-family-photos/2.jpg', '/mailerlite-family-photos/3.jpg'],
            styleProperty: {
              topPadding: 10,
              bottomPadding: 10,
              galleryLayout: 'default',
              backgroundColor: '#ffffff',
            },
          }],
        },
      },
    })

    return mount(ImageBlock, {
      props: {
        index: 0,
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    })
  }

  it('renders images correctly', () => {
    const wrapper = createWrapper()
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(3)
    expect(images[0].attributes('src')).toBe('/mailerlite-family-photos/1.jpg')
  })

  it('applies correct styling based on props', () => {
    const wrapper = createWrapper()
    const container = wrapper.find('.flex')
    const style = container.attributes('style')
    expect(style).toContain('padding: 10px 50px 10px 50px')
    expect(style).toContain('background-color: rgb(255, 255, 255)')
  })
})
