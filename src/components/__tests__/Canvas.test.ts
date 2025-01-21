import Canvas from '@/components/Canvas.vue'
import { useBlockStore } from '@/store/blocks'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock child components
vi.mock('@/components/blocks/ImageBlock.vue', () => ({
  default: {
    props: ['index'],
    template: '<div class="image-block">Image Block</div>',
  },
}))

vi.mock('@/components/blocks/TextBlock.vue', () => ({
  default: {
    props: ['index'],
    emits: ['click'],
    template: '<div class="text-block" @click="$emit(\'click\')">Text Block</div>',
  },
}))

vi.mock('@/components/BlockWrapper.vue', () => ({
  default: {
    props: ['index'],
    template: '<div class="block-wrapper"><slot /></div>',
  },
}))

// Mock vue-draggable-plus
vi.mock('vue-draggable-plus', () => ({
  useDraggable: vi.fn(),
}))

describe('canvas.vue', () => {
  const createWrapper = () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        blocks: {
          blocks: [
            {
              id: '1',
              type: 'TextBlock',
              content: 'Test content',
              styleProperty: {
                topPadding: 10,
                bottomPadding: 10,
                backgroundColor: '#ffffff',
              },
            },
            {
              id: '2',
              type: 'ImageBlock',
              links: ['/test-image.jpg'],
              styleProperty: {
                topPadding: 10,
                bottomPadding: 10,
                galleryLayout: 'default',
                backgroundColor: '#ffffff',
              },
            },
          ],
          selectedBlockIdx: null,
        },
      },
    })

    const store = useBlockStore()
    const wrapper = mount(Canvas, {
      global: {
        plugins: [pinia],
      },
    })

    // Force update blocks from store
    const vm = wrapper.vm as any
    vm.blocks = store.getBlocks

    return { wrapper, store }
  }

  it('renders blocks from store', async () => {
    const { wrapper } = createWrapper()
    await wrapper.vm.$nextTick()

    const blocks = wrapper.findAll('.block-wrapper')
    expect(blocks).toHaveLength(2)
    expect(wrapper.find('.text-block').exists()).toBe(true)
    expect(wrapper.find('.image-block').exists()).toBe(true)
  })

  it('updates selected block on click', async () => {
    const { wrapper, store } = createWrapper()
    await wrapper.vm.$nextTick()

    const textBlock = wrapper.find('.text-block')
    await textBlock.trigger('click')

    expect(store.setSelectedBlockIdx).toHaveBeenCalledWith(0)
  })
})
