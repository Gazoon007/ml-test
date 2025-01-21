<script setup lang="ts">
import type { ImageBlock } from '@/types/blocks'
import ImageSelectModal from '@/components/ImageSelectModal.vue'
import { useBlockStore } from '@/store/blocks'
import { computed, ref } from 'vue'

const props = defineProps<{ index: number }>()

const block = computed(() => useBlockStore().getBlocks[props.index] as ImageBlock)

const images = ref<(string | null)[]>(block.value?.links ?? [])
const imageSlots = computed(() => images.value)

const customPadding = computed(() => {
  if (!block.value)
    return ``
  const { topPadding, bottomPadding, galleryLayout } = block.value.styleProperty
  const horizontalPadding = galleryLayout === 'default' || galleryLayout === 'spaceless' ? '50px' : '0'
  return `${topPadding ?? 0}px ${horizontalPadding} ${bottomPadding ?? 0}px ${horizontalPadding}`
})

const backgroundColor = computed(() => block.value?.styleProperty.backgroundColor ?? '#ffffff')

const isModalOpen = ref(false)
const currentImageIndex = ref<number | null>(null)

function openModal(index: number) {
  currentImageIndex.value = index
  isModalOpen.value = true
}

function closeModal() {
  currentImageIndex.value = null
  isModalOpen.value = false
}

function handleImageSelected(image: string) {
  if (currentImageIndex.value === null)
    return

  const { topPadding, bottomPadding, backgroundColor, galleryLayout } = block.value.styleProperty

  images.value[currentImageIndex.value] = image
  useBlockStore().setBlock({
    id: block.value.id,
    type: 'ImageBlock',
    links: images.value,
    styleProperty: {
      topPadding,
      bottomPadding,
      galleryLayout,
      backgroundColor,
    },
  }, props.index)
}
</script>

<template>
  <div
    class="flex justify-center"
    :style="{
      gap: `${block?.styleProperty.galleryLayout === 'spaceless' ? '0' : '20px'}`,
      padding: `${customPadding}`,
      backgroundColor: backgroundColor ?? '#ffffff',
    }"
  >
    <div
      v-for="(image, index) in imageSlots"
      :key="index"
      class="h-32 border border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer"
      @click="openModal(index)"
    >
      <template v-if="image">
        <img :src="image" alt="Uploaded image" class="h-full object-cover rounded-md min-w-126px">
      </template>
      <template v-else>
        <img src="/src/assets/placeholder-image-block.jpg" alt="placeholder" class="text-gray-500 text-sm w-31">
      </template>
    </div>
    <ImageSelectModal
      :is-open="isModalOpen"
      @close="closeModal"
      @image-selected="handleImageSelected"
    />
  </div>
</template>
