<script setup>
import { ref } from 'vue'

const hoveredSection = ref(null)

// TODO: Implement the methods
const methods = [
  { name: 'Move', action: () => {} },
  { name: 'Move up', action: () => {} },
  { name: 'Move down', action: () => {} },
  { name: 'Duplicate', action: () => {} },
  { name: 'Remove', action: () => {} },
]

const leftMethods = methods.slice(0, 3)
const rightMethods = methods.slice(3)

function showControlPanel(index) {
  hoveredSection.value = index
}

function hideControlPanel() {
  hoveredSection.value = null
}
</script>

<template>
  <div
    class="relative border-1 hover:border-solid border-coolGray mb-4 cursor-pointer"
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
          @click="method.action"
        >
          {{ method.name }}
        </button>
      </div>
      <div class="flex space-x-2">
        <button
          v-for="(method, methodIndex) in rightMethods"
          :key="methodIndex"
          class="px-2 py-1 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          @click="method.action"
        >
          {{ method.name }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>
