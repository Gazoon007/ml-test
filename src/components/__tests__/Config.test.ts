import Config from '@/components/Config.vue'
import { useBlockStore } from '@/store/blocks'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock components
vi.mock('@/components/Tiptap.vue', () => ({
  default: {
    template: '<div>Mocked Tiptap</div>',
  },
}))

describe('config.vue', () => {
  const createWrapper = () => {
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
          selectedBlockIdx: 0,
        },
      },
    })

    // Create store instance before mounting
    const store = useBlockStore()

    return {
      wrapper: mount(Config, {
        global: {
          plugins: [pinia],
        },
      }),
      store,
    }
  }

  it('renders style properties', async () => {
    const { wrapper, store } = createWrapper()

    // Trigger store subscription
    store.$patch({
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
      selectedBlockIdx: 0,
    })

    await wrapper.vm.$nextTick()

    const rangeInputs = wrapper.findAll('input[type="range"]')
    expect(rangeInputs).toHaveLength(2)
    expect((rangeInputs[0].element as HTMLInputElement).value).toBe('10')
    expect((rangeInputs[1].element as HTMLInputElement).value).toBe('10')
  })

  it('updates padding when input changes', async () => {
    const { wrapper, store } = createWrapper()

    // Trigger store subscription first
    store.$patch({
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
      selectedBlockIdx: 0,
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('input[type="range"]')
    await input.setValue(20)
    await input.trigger('change')
    await wrapper.vm.$nextTick()

    expect(store.getBlocks[0].styleProperty.topPadding).toBe('20')
  })

  it('updates background color when color picker changes', async () => {
    const { wrapper, store } = createWrapper()

    // Trigger store subscription first
    store.$patch({
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
      selectedBlockIdx: 0,
    })

    await wrapper.vm.$nextTick()

    const colorPicker = wrapper.find('input[type="color"]')
    await colorPicker.setValue('#ff0000')
    await colorPicker.trigger('change')
    await wrapper.vm.$nextTick()

    expect(store.getBlocks[0].styleProperty.backgroundColor).toBe('#ff0000')
  })
})
