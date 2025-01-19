<script setup lang="ts">
// Add any necessary logic here
</script>

<template>
  <div class="bg-gray-100 p-6 rounded-lg w-auto">
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Top padding</label>
      <input type="range" class="w-full accent-gray-700">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Bottom padding</label>
      <input type="range" class="w-full accent-gray-700">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Galery Layout</label>
      <div class="flex">
        <button class="bg-white text-gray-700 py-2 px-4 rounded shadow border border-gray-300">
          Default
        </button>
        <button class="bg-white text-gray-700 py-2 px-4 rounded shadow border border-gray-300">
          Spaceless
        </button>
        <button class="bg-white text-gray-700 py-2 px-4 rounded shadow border border-gray-300">
          Full width
        </button>
      </div>
    </div>

    <div class="mb-4 items-center">
      <label class="text-gray-700 font-medium">Background</label>
      <div>
        <input class="ml-auto accent-gray-700">
      </div>
    </div>

    <div class="flex justify-end">
      <button class="bg-green-500 text-white py-2 px-4 rounded shadow mr-2">
        Save
      </button>
      <button class="bg-white text-gray-700 py-2 px-4 rounded shadow border border-gray-300">
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Additional UnoCSS styles if needed */
</style>
