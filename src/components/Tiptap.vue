<script setup lang="ts">
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, type Extensions, useEditor } from '@tiptap/vue-3'
import { computed, ref } from 'vue'

const props = defineProps({ content: String })
const emit = defineEmits(['update:content'])
const visibility = ref('hidden')

const editor = useEditor({
  extensions: [
    StarterKit,
    TextStyle,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
  ] as Extensions,
  content: props.content,
  onUpdate: ({ editor }) => {
    emit('update:content', editor.getHTML())
  },
  onFocus: () => {
    visibility.value = 'visible'
  },
})

const actions = computed(() => [
  { label: '𝗕', handler: () => editor.value?.chain().focus().toggleBold().run(), disabled: !editor.value?.can().chain().focus().toggleBold().run(), isActive: editor.value?.isActive('bold') },
  { label: '𝑖', handler: () => editor.value?.chain().focus().toggleItalic().run(), disabled: !editor.value?.can().chain().focus().toggleItalic().run(), isActive: editor.value?.isActive('italic') },
  { label: 's̶', handler: () => editor.value?.chain().focus().toggleStrike().run(), disabled: !editor.value?.can().chain().focus().toggleStrike().run(), isActive: editor.value?.isActive('strike') },
  { label: '</>', handler: () => editor.value?.chain().focus().toggleCode().run(), disabled: !editor.value?.can().chain().focus().toggleCode().run(), isActive: editor.value?.isActive('code') },
  { label: '⌫', handler: () => editor.value?.chain().focus().unsetAllMarks().run(), disabled: false, isActive: false },
  { label: '🟰', handler: () => editor.value?.chain().focus().clearNodes().run(), disabled: false, isActive: false },
  { label: '•', handler: () => editor.value?.chain().focus().toggleBulletList().run(), disabled: false, isActive: editor.value?.isActive('bulletList') },
  { label: '1.', handler: () => editor.value?.chain().focus().toggleOrderedList().run(), disabled: false, isActive: editor.value?.isActive('orderedList') },
  { label: '↩', handler: () => editor.value?.chain().focus().undo().run(), disabled: !editor.value?.can().chain().focus().undo().run(), isActive: false },
  { label: '↪', handler: () => editor.value?.chain().focus().redo().run(), disabled: !editor.value?.can().chain().focus().redo().run(), isActive: false },
])
</script>

<template>
  <div v-if="editor">
    <!-- FIXME: Fix visibility of the editor action panel logic -->
    <div
      :class="`content-visibility-${visibility} flex flex-wrap gap-2 control-panel`"
    >
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
        @mousedown.prevent
      >
        {{ action.label }}
      </button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
[contenteditable]:focus {
  outline: 0 solid transparent;
}

.content-visibility-hidden {
  content-visibility: hidden;
}

.content-visibility-visible {
  content-visibility: visible;
}
</style>
