import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ImageSelectModal from '../ImageSelectModal.vue'

describe('imageSelectModal.vue', () => {
  const createWrapper = (props = {}) => {
    return mount(ImageSelectModal, {
      props: {
        isOpen: true,
        ...props,
      },
    })
  }

  it('renders when isOpen is true', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('does not render when isOpen is false', () => {
    const wrapper = createWrapper({ isOpen: false })
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('emits close event when close button clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits imageSelected event with correct path when image clicked', async () => {
    const wrapper = createWrapper()
    const firstImage = wrapper.find('img')
    await firstImage.trigger('click')
    expect(wrapper.emitted('imageSelected')).toBeTruthy()
    expect(wrapper.emitted('imageSelected')[0][0]).toContain('/mailerlite-family-photos/')
  })
})
