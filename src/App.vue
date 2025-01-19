<script setup lang="ts">
import Canvas from '@/components/Canvas.vue'
import Sidebar from '@/components/Sidebar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(true)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <div class="md:hidden bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 class="text-xl font-bold">
        Page Builder
      </h1>
      <button
        class="p-2 hover:bg-gray-700 rounded-md"
        @click="toggleSidebar"
      >
        <span class="text-2xl">☰</span>
      </button>
    </div>

    <Sidebar
      :is-open="isSidebarOpen"
      class="transition-all duration-300"
      @close="toggleSidebar"
    />

    <Canvas />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
