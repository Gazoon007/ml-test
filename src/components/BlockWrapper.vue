<script setup lang="ts">
import { useArrayManager } from '@/composables/useArrayManager'
import { useBlockStore } from '@/store/blocks'
import { computed, defineProps, ref, watch } from 'vue'

defineProps<{ index: number }>()

const hoveredSection = ref<number | null>(null)
const blockStore = useBlockStore()
const blocks = computed(() => blockStore.getBlocks)

const arrayManager = useArrayManager(blocks.value)
watch(blocks, (newBlocks) => {
  arrayManager.mutatedArray.value = [...newBlocks]
}, { deep: true })

function handleAction(action: (idx: number) => void) {
  return (idx: number) => {
    action(idx)
    blockStore.setBlocks(arrayManager.mutatedArray.value)
  }
}

const methods = [
  { name: 'Move up', action: handleAction(arrayManager.moveUp) },
  { name: 'Move down', action: handleAction(arrayManager.moveDown) },
  { name: 'Duplicate', action: handleAction(arrayManager.duplicate) },
  { name: 'Remove', action: handleAction(arrayManager.remove) },
]

const leftMethods = methods.slice(0, 2)
const rightMethods = methods.slice(2)

const showControlPanel = (index: number) => hoveredSection.value = index
const hideControlPanel = () => hoveredSection.value = null
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
