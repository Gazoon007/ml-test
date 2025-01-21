import Sidebar from '@/components/Sidebar.vue'
import { useBlockStore } from '@/store/blocks'
import { useHoverFirstItemStore } from '@/store/hover.ts'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock vue-draggable-plus
// eslint-disable-next-line ts/no-unsafe-function-type
let moveCallback: Function
// eslint-disable-next-line ts/no-unsafe-function-type
let unchooseCallback: Function

vi.mock('vue-draggable-plus', () => ({
  useDraggable: vi.fn((_, __, options) => {
    moveCallback = options.onMove
    unchooseCallback = options.onUnchoose
  }),
}))

describe('sidebar.vue', () => {
  const createWrapper = (props = {}) => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        blocks: {
          blocks: [],
          selectedBlockIdx: null,
        },
        hoverFirstItem: {
          hoverFirstItem: false,
        },
      },
    })

    const blockStore = useBlockStore()
    const hoverStore = useHoverFirstItemStore()

    return {
      wrapper: mount(Sidebar, {
        props: {
          isOpen: true,
          ...props,
        },
        global: {
          plugins: [pinia],
        },
      }),
      blockStore,
      hoverStore,
    }
  }

  it('renders block type buttons', () => {
    const { wrapper } = createWrapper()
    const blocks = wrapper.findAll('.component-item')
    expect(blocks).toHaveLength(2)
  })

  it('handles drag events correctly', async () => {
    const { wrapper, hoverStore } = createWrapper()

    // Simulate drag start
    moveCallback({})
    await wrapper.vm.$nextTick()
    expect(hoverStore.setHoverFirstItem).toHaveBeenCalledWith(true)

    // Simulate drag end
    unchooseCallback({})
    await wrapper.vm.$nextTick()
    expect(hoverStore.setHoverFirstItem).toHaveBeenCalledWith(false)
  })
})
