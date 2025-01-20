<script setup lang="ts">
import type { ImageBlock } from '@/store/blocks'
import ImageSelectModal from '@/components/ImageSelectModal.vue'
import { useBlockStore } from '@/store/blocks'
import { computed, ref } from 'vue'

const props = defineProps<{ index: number }>()

const block = useBlockStore().getBlocks[props.index] as ImageBlock
const { topPadding, bottomPadding, backgroundColor, galleryLayout } = block.styleProperty

const images = ref<(string | null)[]>(block.links)
const imageSlots = computed(() => images.value)

const customPX = computed(() => galleryLayout === 'default' ? 'px-50px gap-4' : galleryLayout === 'spaceless' ? 'px-50px' : 'px-0')
const customVPadding = computed(() => `pt-${topPadding ?? 0} pb-${bottomPadding ?? 0}`)

const isModalOpen = ref(false)
const currentImageIndex = ref(null)

function openModal(index: number) {
  currentImageIndex.value = index
  isModalOpen.value = true
}

function closeModal() {
  currentImageIndex.value = null
  isModalOpen.value = false
}

function handleImageSelected(image: string) {
  images.value[currentImageIndex.value] = image
  useBlockStore().setBlock({
    id: block.id,
    type: 'ImageBlock',
    links: images.value,
    styleProperty: {
      topPadding: 100,
      bottomPadding: 100,
      galleryLayout: 'default',
      backgroundColor: '#ffffff',
    },
  }, props.index)
}
</script>

<template>
  <div :class="`flex justify-center ${customPX} ${customVPadding} bg-[${backgroundColor ?? '#808080'}]`">
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
        <img src="/src/assets/placeholder-image-block.jpg" alt="=placeholder" class="text-gray-500 text-sm w-32">
      </template>
    </div>
    <ImageSelectModal
      :is-open="isModalOpen"
      @close="closeModal"
      @image-selected="handleImageSelected"
    />
  </div>
</template>
