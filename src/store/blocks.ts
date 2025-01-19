import { defineStore } from 'pinia'

interface Block {
  id: string
  data: string
}

// interface ImageBlock {
//   link: string
// }
//
// interface TextBlock {
//   content: string
// }

export const useBlockStore = defineStore('blocks', {
  state: () => ({
    blocks: [] satisfies Block[],
  }),

  actions: {
    setBlocks(block: Block) {
      this.blocks.push(block)
    },
  },

  getters: {
    getBlocks(): Block[] {
      return this.blocks
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
