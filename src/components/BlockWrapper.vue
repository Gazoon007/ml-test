<script setup lang="ts">
import { useArrayManager } from '@/composables/useArrayManager'
import { useBlockStore } from '@/store/blocks'
import { defineProps, ref, watch } from 'vue'

defineProps<{ index: number }>()

const hoveredSection = ref<number | null>(null)

const { moveUp, moveDown, duplicate, remove, mutatedArray } = useArrayManager(useBlockStore().getBlocks)

const methods = [
  { name: 'Move up', action: (idx: number) => moveUp(idx) },
  { name: 'Move down', action: (idx: number) => moveDown(idx) },
  { name: 'Duplicate', action: (idx: number) => duplicate(idx) },
  { name: 'Remove', action: (idx: number) => remove(idx) },
]

// TODO: refactor this setBlocks
watch(mutatedArray, (val) => {
  useBlockStore().setBlocks(val)
})

const leftMethods = methods.slice(0, 2)
const rightMethods = methods.slice(2)

function showControlPanel(index: number) {
  hoveredSection.value = index
}

function hideControlPanel() {
  hoveredSection.value = null
}
</script>

<template>
  <div
    class="relative border-1 hover:border-solid border-coolGray mb-4"
    @mouseover="showControlPanel(index)"
    @mouseleave="hideControlPanel"
  >
    <div
      v-if="hoveredSection === index"
      class="absolute top-0 left-0 right-0 flex justify-between border border-gray-300 z-10 -translate-y-full"
    >
      <div class="flex space-x-2">
        <button
          v-for="(method, methodIndex) in leftMethods"
          :key="methodIndex"
          class="px-2 py-1 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          @click="method.action(index)"
        >
          {{ method.name }}
        </button>
      </div>
      <div class="flex space-x-2">
        <button
          v-for="(method, methodIndex) in rightMethods"
          :key="methodIndex"
          class="px-2 py-1 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          @click="method.action(index)"
        >
          {{ method.name }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>
