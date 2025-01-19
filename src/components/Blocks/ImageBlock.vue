<script setup lang="ts">
import { useBlockStore } from '@/store/blocks'
import { computed, ref } from 'vue'

interface Props {
  imageCount: number
  backgroundColor: string
  topPadding: number
  bottomPadding: number
  galleryLayout: 'default' | 'spaceless' | 'full-width'
}

const props = defineProps<Props>()
const fileInput = ref<HTMLInputElement | null>(null)
const images = ref<(string | null)[]>(Array.from<string | null>({ length: props?.imageCount ?? 3 }).fill(null))
const imageSlots = computed(() => images.value)
const customPX = computed(() => props.galleryLayout === 'default' ? 'px-50px gap-4' : props.galleryLayout === 'spaceless' ? 'px-50px' : 'px-0')
const customVPadding = computed(() => `pt-${props?.topPadding ?? 0} pb-${props?.bottomPadding ?? 0}`)

function handleUpload(index: number): void {
  if (fileInput.value) {
    fileInput.value.dataset.index = index.toString()
    fileInput.value.click()
  }
}

function handleFileChange(event: Event): void {
  const target = event.target as HTMLInputElement
  const index = Number.parseInt(target.dataset.index || '0', 10)
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      images.value[index] = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  if (target)
    target.value = ''

  useBlockStore().setBlocks({
    id: Date.now().toString(),
    links: images.value,
    styleProperty: {
      topPadding: 10,
      bottomPadding: 10,
      galleryLayout: 'default',
      backgroundColor: '#ffffff',
    },
  })
}
</script>

<template>
  <div :class="`flex justify-center ${customPX} ${customVPadding} bg-[${props?.backgroundColor ?? '#808080'}]`">
    <div
      v-for="(image, index) in imageSlots"
      :key="index"
      class="h-32 border border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer"
      @click="handleUpload(index)"
    >
      <template v-if="image">
        <img :src="image" alt="Uploaded image" class="h-full object-cover rounded-md min-w-126px">
      </template>
      <template v-else>
        <img src="/src/assets/placeholder-image-block.jpg" alt="=placeholder" class="text-gray-500 text-sm w-32">
      </template>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="handleFileChange"
    >
  </div>
</template>
