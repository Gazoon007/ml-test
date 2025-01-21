import type { ImageBlock, ImageBlockStyle, TextBlock, TextBlockStyle } from '@/types/blocks'
import { useArrayManager } from '@/composables/useArrayManager'
import { defineStore } from 'pinia'

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
