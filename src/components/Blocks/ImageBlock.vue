<script setup lang="ts">
import ImageSelectModal from '@/components/ImageSelectModal.vue'
import { useBlockStore } from '@/store/blocks'
import { computed, ref } from 'vue'

interface Props {
  imageCount: number
  backgroundColor: string
  topPadding: number
  bottomPadding: number
  galleryLayout: 'default' | 'spaceless' | 'full-width'
  index: number
}

const props = defineProps<Props>()
const images = ref<(string | null)[]>(Array.from<string | null>({ length: props?.imageCount ?? 3 }).fill(null))
const imageSlots = computed(() => images.value)
const customPX = computed(() => props.galleryLayout === 'default' ? 'px-50px gap-4' : props.galleryLayout === 'spaceless' ? 'px-50px' : 'px-0')
const customVPadding = computed(() => `pt-${props?.topPadding ?? 0} pb-${props?.bottomPadding ?? 0}`)
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
    id: useBlockStore().getBlocks[props.index].id,
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
  <div :class="`flex justify-center ${customPX} ${customVPadding} bg-[${props?.backgroundColor ?? '#808080'}]`">
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
