<!-- CodeEditor.vue -->
<template>
  <div>
    <Codemirror
      v-model="textContent"
      :extensions="extensions"
      :theme="oneDark"
      :style="{ 'minHeight': height || '300px' }"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {oneDark} from '@codemirror/theme-one-dark'
import {java} from '@codemirror/lang-java'
import {markdown} from '@codemirror/lang-markdown'
import {yaml} from '@codemirror/lang-yaml'
import {RichTextType} from "@/types/richTextType.ts";
import {EditorView} from "@codemirror/view";

const props = defineProps<{
  textType?: RichTextType,
  content: string,
  height?: string,
  lineWrapping?: boolean
  editable?: boolean
}>()

const textContent = ref('')

const extensions = computed(() => {
  const extensions = []
  switch (props.textType) {
    case RichTextType.java:
      extensions.push(java())
      break
    case RichTextType.markdown:
      extensions.push(markdown())
      break
    case RichTextType.yaml:
      extensions.push(yaml())
      break
    default:

  }
  if (!props.editable) {
    extensions.push(EditorView.editable.of(false))
  }
  if (props.lineWrapping) {
    extensions.push(EditorView.lineWrapping)
  }
  return extensions
})

watch(
  () => props.content,
  (newContent) => textContent.value = newContent
)

defineExpose({textContent})

onMounted(() => {
  textContent.value = props.content
})
</script>

<style scoped>
select {
  padding: 4px 8px;
  font-size: 14px;
}
</style>
