import { defineStore } from 'pinia'

interface Block {
  id: string
}

export interface ImageBlock extends Block {
  links: string[]
  styleProperty: {
    topPadding: number
    bottomPadding: number
    galleryLayout: 'default' | 'spaceless' | 'full-width'
    backgroundColor: string
  }
}

export interface TextBlock extends Block {
  content: string
  styleProperty: {
    topPadding: number
    bottomPadding: number
    backgroundColor: string
  }
}

export const useBlockStore = defineStore('blocks', {
  state: () => ({
    blocks: [] satisfies Block[],
    selectedBlockIdx: null as number | null,
  }),

  actions: {
    setBlocks(block: ImageBlock | TextBlock) {
      this.blocks.push(block)
    },
    setSelectedBlockIdx(idx: number) {
      this.selectedBlockIdx = idx
    },
  },

  getters: {
    getBlocks(): Block[] {
      return this.blocks
    },
    getStyleProperty(): object {
      return this.blocks[0].styleProperty
    },
  },
})

export const useHoverFirstItemStore = defineStore('hoverFirstItem', {
  state: () => ({
    hoverFirstItem: false,
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
