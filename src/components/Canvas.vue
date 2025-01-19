<script setup lang="ts">
import ImageBlock from '@/components/Blocks/ImageBlock.vue'
import TextBlock from '@/components/Blocks/TextBlock.vue'
import { useHoverFirstItemStore } from '@/store/blocks'
import { defineComponent, ref, useTemplateRef } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

defineComponent({
  components: {
    ImageBlock,
    TextBlock,
  },
})
const blocks = ref([])
const dropzone = useTemplateRef('dropzone')
useDraggable(dropzone, blocks, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'block',
})

const hoverFirst = ref(false)
useHoverFirstItemStore().$subscribe(() => {
  hoverFirst.value = useHoverFirstItemStore().getHoverFirstItem
})
</script>

<template>
  <div class="flex-1 overflow-x-hidden">
    <div class="p-4 md:p-8 min-h-screen">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div class="sticky top-0 z-10 bg-gray-50 border-b p-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-700">
            Canvas
          </h2>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded">
              Preview
            </button>
            <button class="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded">
              Save
            </button>
          </div>
        </div>

        <div class="p-4 md:p-8">
          <div class="min-h-[500px]">
            <section ref="dropzone">
              <div v-for="(block, idx) in blocks" :key="idx">
                <component :is="block.type === 'ImageBlock' ? ImageBlock : TextBlock" />
              </div>
              <template v-if="blocks.length === 0 && !hoverFirst">
                <div class="flex items-center justify-center h-[500px] border-2 border-dashed border-gray-300 rounded-lg">
                  <div class="text-center text-gray-500">
                    <p class="mb-2">
                      Drop components here to build your page
                    </p>
                    <p class="text-sm">
                      Drag blocks from the sidebar
                    </p>
                  </div>
                </div>
              </template>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  background-color: transparent;
  border: 2px dashed gray;
  font-size: 0;
}
</style>
