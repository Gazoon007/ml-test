<script setup lang="ts">
import type { ImageBlock, TextBlock } from '@/types/blocks'
import { useBlockStore } from '@/store/blocks'
import { useHoverFirstItemStore } from '@/store/hover'
import { defineProps, ref, useTemplateRef } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

defineProps<{
  isOpen: boolean
}>()
defineEmits(['close'])

const blockRef = useTemplateRef('blockRef')
const blocks = ref<(ImageBlock | TextBlock)[]>([
  {
    id: '',
    type: 'ImageBlock',
    links: [null, null, null],
    styleProperty: {
      topPadding: 10,
      bottomPadding: 10,
      galleryLayout: 'default',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: '',
    type: 'TextBlock',
    content: `
      <p>
        Write engaging and informative content that will help your readers understand your message.
      </p>
    `,
    styleProperty: {
      topPadding: 10,
      bottomPadding: 10,
      backgroundColor: '#ffffff',
    },
  },
])

useDraggable(blockRef, blocks, {
  animation: 150,
  group: { name: 'block', pull: 'clone', put: false },
  sort: false,
  onMove: (_) => {
    if (useBlockStore().getBlocks.length === 0) {
      useHoverFirstItemStore().setHoverFirstItem(true)
    }
  },
  onUnchoose: (_) => {
    if (useBlockStore().getBlocks.length === 0) {
      useHoverFirstItemStore().setHoverFirstItem(false)
    }
  },
})
</script>

<template>
  <div class="w-full md:w-64 bg-gray-800 text-white">
    <div class="flex-1 overflow-y-auto p-4">
      <section ref="blockRef" class="components-list space-y-2">
        <div
          v-for="(block, idx) in blocks"
          :key="block.type"
          class="component-item p-3 bg-gray-700 rounded-md cursor-move hover:bg-gray-600 active:bg-gray-500 transition-colors"
        >
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ idx === 0 ? '🖼️' : '📄' }}</span>
            <span>{{ block.type.slice(0, -5) }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  background-color: transparent;
  border: 2px dashed gray;
  place-items: center;
  margin-bottom: 16px;
}
</style>
