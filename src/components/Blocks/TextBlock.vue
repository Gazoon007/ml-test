<script setup lang="ts">
import type { TextBlock } from '@/store/blocks'

import Tiptap from '@/components/Tiptap.vue'
import { useBlockStore } from '@/store/blocks'
import { computed, defineProps, ref } from 'vue'

const props = defineProps<{ index: number }>()

const block = useBlockStore().getBlocks[props.index] as TextBlock
const { topPadding, bottomPadding, backgroundColor } = block.styleProperty

const customVPadding = computed(() => `pt-${topPadding ?? 10} pb-${bottomPadding ?? 10}`)
const data = ref(block.content)

function updateText(event) {
  data.value = event.target.innerHTML
  useBlockStore().setBlock({
    id: block.id,
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
  <div :class="`p-4 border ${customVPadding} rounded bg-[${backgroundColor ?? '#808080'}]`">
    <Tiptap :content="data" @focusout="updateText" />
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 0 solid transparent;
}
</style>
