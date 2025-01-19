<script setup lang="ts">
import Tiptap from '@/components/Tiptap.vue'

import { useBlockStore } from '@/store/blocks'
import { computed, defineProps, ref } from 'vue'

interface Props {
  topPadding: number
  bottomPadding: number
  backgroundColor: string
  color: string
}

const props = defineProps<Props>()
const customVPadding = computed(() => `pt-${props?.topPadding ?? 10} pb-${props?.bottomPadding ?? 10}`)
const data = ref('')

function updateText(event) {
  data.value = event.target.innerHTML
  useBlockStore().setBlocks({
    id: Date.now().toString(),
    content: data.value,
    styleProperty: {
      topPadding: 10,
      bottomPadding: 10,
      backgroundColor: '#ffffff',
    },
  })
}
</script>

<template>
  <div :class="`p-4 border ${customVPadding} rounded bg-[${props?.backgroundColor ?? '#808080'}]`">
    <Tiptap @input="updateText" />
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 0 solid transparent;
}
</style>
