<script setup lang="ts">
import type { ImageBlockStyle, TextBlockStyle } from '@/types/blocks'
import { useBlockStore } from '@/store/blocks'
import { computed, ref } from 'vue'

const styleProperty = ref<ImageBlockStyle | TextBlockStyle | null>({
  backgroundColor: '',
  bottomPadding: 0,
  galleryLayout: 'default' as const,
  topPadding: 0,
})

useBlockStore().$subscribe(() => {
  const newStyle = useBlockStore().getStyleProperty
  if (newStyle)
    styleProperty.value = newStyle
})

const selectedLayout = ref('default')
const currentBlock = computed(() => useBlockStore().getCurrentBlock)

function setLayout(layout: 'default' | 'spaceless') {
  (styleProperty.value as ImageBlockStyle).galleryLayout = layout
  selectedLayout.value = layout
}
</script>

<template>
  <div class="bg-gray-400 p-6 rounded-lg w-240px">
    <div v-if="currentBlock && styleProperty" class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Top Padding</label>
      <input
        v-model="styleProperty.topPadding"
        type="range"
        min="0"
        max="100"
        class="w-full h-2 bg-gray-300 rounded-lg accent-gray-700"
      >
    </div>

    <div v-if="currentBlock && styleProperty" class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Bottom Padding</label>
      <input
        v-model="styleProperty.bottomPadding"
        type="range"
        min="0"
        max="100"
        class="w-full h-2 bg-gray-300 rounded-lg accent-gray-700"
      >
    </div>

    <div v-if="currentBlock?.type === 'ImageBlock' && styleProperty" class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Gallery Layout</label>
      <div class="flex space-x-2">
        <button
          class="py-2 px-4 rounded shadow border border-gray-300 transition-colors"
          :class="selectedLayout === 'default' ? 'bg-gray-500 text-white' : 'text-gray-700'"
          @click="setLayout('default')"
        >
          Default
        </button>
        <button
          class="py-2 px-4 rounded shadow border border-gray-300 transition-colors"
          :class="selectedLayout === 'spaceless' ? 'bg-gray-500 text-white' : 'text-gray-700'"
          @click="setLayout('spaceless')"
        >
          Spaceless
        </button>
      </div>
    </div>

    <div v-if="currentBlock && styleProperty" class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Background</label>
      <input
        v-model="styleProperty.backgroundColor"
        type="color"
        class="w-full h-10 p-2 border border-gray-300 rounded-lg bg-gray-200"
      >
    </div>
  </div>
</template>
