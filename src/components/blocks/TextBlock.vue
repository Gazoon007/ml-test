<script setup lang="ts">
import type { TextBlock } from '@/types/blocks'

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

function updateText(text: string) {
  data.value = text
  const { topPadding, bottomPadding, backgroundColor } = block.value.styleProperty
  useBlockStore().setBlock({
    id: block.value.id,
    type: 'TextBlock',
    content: text,
    styleProperty: {
      topPadding,
      bottomPadding,
      backgroundColor,
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
    <Tiptap :content="data" @update:content="updateText" />
  </div>
</template>
