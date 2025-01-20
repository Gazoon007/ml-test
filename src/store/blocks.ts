import { useArrayManager } from '@/composables/useArrayManager'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BaseBlock<TStyle> {
  id: string
  type: string
  styleProperty: TStyle
}

interface PaddingStyle {
  topPadding: number
  bottomPadding: number
}

interface ImageBlockStyle extends PaddingStyle {
  galleryLayout: 'default' | 'spaceless' | 'full-width'
  backgroundColor: string
}

interface TextBlockStyle extends PaddingStyle {
  backgroundColor: string
}

export interface ImageBlock extends BaseBlock<ImageBlockStyle> {
  links: string[]
}

export interface TextBlock extends BaseBlock<TextBlockStyle> {
  content: string
}

export const useBlockStore = defineStore('blocks', {
  state: () => ({
    blocks: ref<(ImageBlock | TextBlock)[]>([]),
    selectedBlockIdx: null as number | null,
  }),

  actions: {
    setBlocks(blocks: (ImageBlock | TextBlock)[]) {
      this.blocks.value = blocks
    },
    setBlock(block: ImageBlock | TextBlock, index: number) {
      const { replace, mutatedArray } = useArrayManager(this.blocks.value)
      replace(block, index)
      this.blocks.value = mutatedArray
    },
    addBlock(block: ImageBlock | TextBlock, index: number) {
      const { insert, mutatedArray } = useArrayManager(this.blocks.value)
      insert(block, index)
      this.blocks.value = mutatedArray
    },
    setSelectedBlockIdx(idx: number) {
      this.selectedBlockIdx = idx
    },
  },

  getters: {
    getBlocks(): (ImageBlock | TextBlock)[] {
      return this.blocks?.value ?? []
    },
    getStyleProperty(): object {
      return this.blocks.value[0].styleProperty
    },
  },
})

export const useHoverFirstItemStore = defineStore('hoverFirstItem', {
  state: () => ({
    hoverFirstItem: ref<boolean>(false),
  }),

  actions: {
    setHoverFirstItem(val: boolean) {
      this.hoverFirstItem = val
    },
  },

  getters: {
    getHoverFirstItem(): boolean {
      return this.hoverFirstItem.value
    },
  },
})
