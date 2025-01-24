<script setup lang="ts">
import type { ImageBlock, TextBlock } from '@/types/blocks'
import ImageBlockComponent from '@/components/blocks/ImageBlock.vue'
import TextBlockComponent from '@/components/blocks/TextBlock.vue'
import BlockWrapper from '@/components/BlockWrapper.vue'
import { useBlockStore } from '@/store/blocks'
import { useHoverFirstItemStore } from '@/store/hover.ts'
import { storeToRefs } from 'pinia'
import { ref, useTemplateRef } from 'vue'
import { useDraggable } from 'vue-draggable-plus'

// Remove defineComponent and directly use components
const ImageBlockComp = ImageBlockComponent
const TextBlockComp = TextBlockComponent

const blocks = ref<(ImageBlock | TextBlock)[]>([])
const dropzone = useTemplateRef('dropzone')
useDraggable(dropzone, blocks, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'block',
  onAdd: (evt) => {
    if (typeof evt.newIndex !== 'number')
      return
    const block = blocks.value[evt.newIndex] as ImageBlock | TextBlock
    block.id = Date.now().toString()
    useBlockStore().addBlock(block, evt.newIndex)
  },
  filter: '.no-drag',
})

const hoverStore = useHoverFirstItemStore()
const blockStore = useBlockStore()
const { getHoverFirstItem } = storeToRefs(hoverStore)
const { getBlocks } = storeToRefs(blockStore)

useBlockStore().$subscribe(() => {
  blocks.value = getBlocks.value
})

const currentSelectedIndex = ref<number | null>(null)
function handleBlockClick(idx: number) {
  currentSelectedIndex.value = idx
  useBlockStore().setSelectedBlockIdx(idx)
}

function save() {
  // eslint-disable-next-line no-console
  console.log('JSON', JSON.parse(JSON.stringify(blocks.value)))
}
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
            <button class="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded" @click="save">
              Save (console.log())
            </button>
          </div>
        </div>

        <div class="p-4 md:p-8">
          <div class="min-h-[500px]">
            <section ref="dropzone" class="no-drag">
              <div v-for="(block, idx) in blocks" :key="block.id">
                <BlockWrapper
                  :key="`wrapper-${block.id}`"
                  :index="idx"
                  :class="{
                    'border-2 border-dashed border-gray-300': idx === currentSelectedIndex,
                    'border-transparent': idx !== currentSelectedIndex,
                  }"
                  class="p-2 transition-colors"
                >
                  <component
                    :is="block.type === 'ImageBlock' ? ImageBlockComp : TextBlockComp"
                    :key="`block-${block.id}`"
                    :index="idx"
                    @click="handleBlockClick(idx)"
                  />
                </BlockWrapper>
              </div>
              <template v-if="blocks.length === 0 && !getHoverFirstItem">
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
