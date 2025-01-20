<script setup lang="ts">
import type { TextBlock } from '@/store/blocks'

import Tiptap from '@/components/Tiptap.vue'
import { useBlockStore } from '@/store/blocks'
import { computed, defineProps, ref } from 'vue'

const props = defineProps<{ index: number }>()

const block = computed(() => useBlockStore().getBlocks[props.index] as TextBlock)

const customPadding = computed(() => {
  const { topPadding, bottomPadding } = block.value.styleProperty
  return `${topPadding ?? 0}px 10px ${bottomPadding ?? 0}px 10px`
})

const data = ref(block.value.content)
const backgroundColor = computed(() => block.value.styleProperty.backgroundColor)

function updateText(event) {
  data.value = event.target.innerHTML
  useBlockStore().setBlock({
    id: block.value.id,
    type: 'TextBlock',
    content: data.value,
    styleProperty: {
      topPadding: 10,
      bottomPadding: 10,
      backgroundColor: '#ffffff',
    },
  }, props.index)
}
</script>

<template>
  <div
    :style="{
      padding: `${customPadding}`,
      backgroundColor: backgroundColor ?? '#ffffff',
    }"
  >
    <Tiptap :content="data" @focusout="updateText" />
  </div>
</template>
