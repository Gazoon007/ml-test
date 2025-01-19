<script setup lang="ts">
import { useBlockStore, useHoverFirstItemStore } from '@/store/blocks'
import { defineProps, ref, useTemplateRef } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

defineProps<{
  isOpen: boolean
}>()
const blockRef = useTemplateRef('blockRef')
const blocks = ref([
  { type: 'TextBlock', label: 'Text', icon: 'P' },
  { type: 'ImageBlock', label: 'Image', icon: '🖼' },
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
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="$emit('close')"
  />

  <div
    class="fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out" :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
  >
    <div class="flex flex-col h-full">
      <button
        class="md:hidden p-4 text-right"
        @click="$emit('close')"
      >
        <span class="text-2xl">×</span>
      </button>

      <div class="flex-1 overflow-y-auto p-4">
        <section ref="blockRef" class="components-list space-y-2">
          <div
            v-for="block in blocks"
            :key="block.type"
            class="component-item p-3 bg-gray-700 rounded-md cursor-move hover:bg-gray-600 active:bg-gray-500 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ block.icon }}</span>
              <span>{{ block.label }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  background-color: transparent;
  border: 2px dashed gray;
  font-size: 0;
}
</style>
