<template>
  <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const props = defineProps<{
  startPrintStr?: string
}>()

const reset = () => {
  terminal.value.clear()
  if (props.startPrintStr) {
    terminal.value.writeln(props.startPrintStr)
  }
}

const terminalContainer = ref()
const terminal = ref(null)
let fitAddon

onMounted(() => {
  terminal.value = new Terminal({
    fontSize: 14,
    cursorBlink: true,
    theme: {
      background: '#1e1e1e'
    }
  })

  fitAddon = new FitAddon()
  terminal.value.loadAddon(fitAddon)

  terminal.value.open(terminalContainer.value)
  fitAddon.fit()

  if (props.startPrintStr) {
    terminal.value.writeln(props.startPrintStr)
  }
})

onBeforeUnmount(() => {
  terminal.value.dispose()
})

defineExpose({terminal, reset})
</script>

<style>
.terminal-container {
  width: 100%;
  height: 400px;
}
</style>
