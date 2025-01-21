<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['close', 'imageSelected'])

function closeModal() {
  emit('close')
}

function selectImage(image: any) {
  emit('imageSelected', `/mailerlite-family-photos/${image}`)
  closeModal()
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white rounded-lg p-4 shadow-lg w-auto">
      <h2 class="text-lg font-bold mb-4">
        Select an Image of MailerLite Family Album
      </h2>
      <div class="grid grid-cols-3 gap-4">
        <img
          v-for="image in ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']"
          :key="image"
          :src="`/mailerlite-family-photos/${image}`"
          :alt="image"
          class="cursor-pointer hover:opacity-75 w-64"
          @click="selectImage(image)"
        >
      </div>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="closeModal">
        Close
      </button>
    </div>
  </div>
</template>
