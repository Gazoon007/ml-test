<script setup lang="ts">
import Canvas from '@/components/Canvas.vue'
import Config from '@/components/Config.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- Sidebar - Static width on desktop -->
    <div class="md:w-[280px] md:flex-none">
      <Sidebar
        class="fixed md:static top-0 left-0 w-full md:w-[280px] h-[200px] md:h-screen bg-gray-800 z-40"
      />
    </div>

    <!-- Main Canvas -->
    <div class="flex-1 mt-[200px] md:mt-0 mb-[240px] md:mb-0">
      <Canvas />
    </div>

    <!-- Config - Static width on desktop -->
    <div class="md:w-[280px] md:flex-none">
      <Config
        class="fixed md:static bottom-0 left-0 w-full md:w-[280px] h-[240px] md:h-screen bg-gray-400 z-30"
      />
    </div>
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
