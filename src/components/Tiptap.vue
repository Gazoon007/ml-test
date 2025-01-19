<script setup>
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const editor = ref(null)
const visibility = ref('hidden')

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      TextStyle.configure({ types: [ListItem.name] }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    ],
    content: `
      <p>
        Write engaging and informative content that will help your readers understand your message.
      </p>
    `,
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const actions = computed(() => [
  { label: 'Bold', handler: () => editor.value.chain().focus().toggleBold().run(), disabled: !editor.value?.can().chain().focus().toggleBold().run(), isActive: editor.value?.isActive('bold') },
  { label: 'Italic', handler: () => editor.value.chain().focus().toggleItalic().run(), disabled: !editor.value?.can().chain().focus().toggleItalic().run(), isActive: editor.value?.isActive('italic') },
  { label: 'Strike', handler: () => editor.value.chain().focus().toggleStrike().run(), disabled: !editor.value?.can().chain().focus().toggleStrike().run(), isActive: editor.value?.isActive('strike') },
  { label: 'Code', handler: () => editor.value.chain().focus().toggleCode().run(), disabled: !editor.value?.can().chain().focus().toggleCode().run(), isActive: editor.value?.isActive('code') },
  { label: 'Clear Marks', handler: () => editor.value.chain().focus().unsetAllMarks().run(), disabled: false, isActive: false },
  { label: 'Clear Nodes', handler: () => editor.value.chain().focus().clearNodes().run(), disabled: false, isActive: false },
  { label: 'Paragraph', handler: () => editor.value.chain().focus().setParagraph().run(), disabled: false, isActive: editor.value?.isActive('paragraph') },
  { label: 'Bullet List', handler: () => editor.value.chain().focus().toggleBulletList().run(), disabled: false, isActive: editor.value?.isActive('bulletList') },
  { label: 'Ordered List', handler: () => editor.value.chain().focus().toggleOrderedList().run(), disabled: false, isActive: editor.value?.isActive('orderedList') },
  { label: 'Undo', handler: () => editor.value.chain().focus().undo().run(), disabled: !editor.value?.can().chain().focus().undo().run(), isActive: false },
  { label: 'Redo', handler: () => editor.value.chain().focus().redo().run(), disabled: !editor.value?.can().chain().focus().redo().run(), isActive: false },
])
</script>

<template>
  <!-- FIXME: visibility of text editor -->
  <div v-if="editor" @focusout="visibility = 'hidden'">
    <div :class="`content-visibility-${visibility} flex flex-wrap gap-2`" @blur="visibility = 'hidden'">
      <button
        v-for="action in actions"
        :key="action.label"
        :disabled="action.disabled"
        :class="{
          'bg-purple-500 text-white': action.isActive,
          'bg-gray-200 text-gray-500': !action.isActive && !action.disabled,
          'opacity-50': action.disabled,
        }"
        class="px-4 py-2 rounded cursor-pointer hover:bg-purple-400"
        @click.prevent="action.handler"
      >
        {{ action.label }}
      </button>
    </div>
    <EditorContent :editor="editor" @focusin="visibility = 'auto'" />
  </div>
</template>
