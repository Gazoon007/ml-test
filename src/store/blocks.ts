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

export interface ImageBlockStyle extends PaddingStyle {
  galleryLayout: 'default' | 'spaceless'
  backgroundColor: string
}

export interface TextBlockStyle extends PaddingStyle {
  backgroundColor: string
}

export interface ImageBlock extends BaseBlock<ImageBlockStyle> {
  links: (string | null)[]
}

export interface TextBlock extends BaseBlock<TextBlockStyle> {
  content: string
}

export const useBlockStore = defineStore('blocks', {
  state: () => ({
    blocks: [] as (ImageBlock | TextBlock)[],
    selectedBlockIdx: null as number | null,
  }),

  actions: {
    setBlocks(blocks: (ImageBlock | TextBlock)[]) {
      this.blocks = [...blocks]
    },
    setBlock(block: ImageBlock | TextBlock, index: number) {
      const { replace, mutatedArray } = useArrayManager(this.blocks)
      replace(block, index)
      this.blocks = [...mutatedArray.value]
    },
    addBlock(block: ImageBlock | TextBlock, index: number) {
      const { insert, mutatedArray } = useArrayManager(this.blocks)
      insert(block, index)
      this.blocks = [...mutatedArray.value]
    },
    setSelectedBlockIdx(idx: number) {
      this.selectedBlockIdx = idx
    },
  },

  getters: {
    getBlocks(): (ImageBlock | TextBlock)[] {
      return this.blocks ?? []
    },
    getCurrentBlock(): (ImageBlock | TextBlock) | null {
      return this.selectedBlockIdx !== null ? this.blocks[this.selectedBlockIdx] : null
    },
    getStyleProperty(): ImageBlockStyle | TextBlockStyle | null {
      return this.selectedBlockIdx !== null ? this.blocks[this.selectedBlockIdx]?.styleProperty ?? null : null
    },
  },
})

export const useHoverFirstItemStore = defineStore('hoverFirstItem', {
  state: () => ({
    hoverFirstItem: ref(false),
  }),

  actions: {
    setHoverFirstItem(val: boolean) {
      this.hoverFirstItem = val
    },
  },

  getters: {
    getHoverFirstItem(): boolean {
      return this.hoverFirstItem
    },
  },
})
