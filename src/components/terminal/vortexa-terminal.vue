<template>
  <content-block
    class="vortexa-terminal-wrapper"
    :class="{ 'vortexa-terminal-fullscreen': isFullScreen }"
  >
    <template #header>
      <div class="clearfix">
        <el-button-group style="float: right">
          <el-button
            @click="startLogHandle"
            text
          >
            <vortexa-icon name="start-log" size="18"/>
          </el-button>
          <el-button
            @click="isFullScreen = !isFullScreen"
            text
          >
            <el-icon>
              <FullScreen/>
            </el-icon>
          </el-button>
        </el-button-group>
      </div>
    </template>

    <div ref="terminalContainer" class="terminal-container"></div>
  </content-block>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref, watch, nextTick} from 'vue'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import ContentBlock from "@/components/content-block/content-block.vue";
import VortexaIcon from "@/components/vortexa-icon.vue";
import {FullScreen} from "@element-plus/icons-vue";

const props = defineProps<{
  startPrintStr?: string
}>()


const isFullScreen = ref(false)

const reset = () => {
  terminal.value.clear()
  if (props.startPrintStr) {
    terminal.value.writeln(props.startPrintStr)
  }
}

const emit = defineEmits(['start-handle'])
const startLogHandle = ()=>{
  emit('start-handle')
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

watch(isFullScreen, () => {
  nextTick(() => {
    fitAddon.fit()
  })
})
</script>

<style>
.terminal-container {
  width: 100%;
  height: 100%;
}

.vortexa-terminal-wrapper {
  height: 400px;
  border: 1px solid #ccc;
  padding: 0 7px 0 0;
}

.vortexa-terminal-fullscreen {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 5px;
  bottom: 0;
  height: 100vh !important;
  width: calc(100vw - 35px) !important;
  z-index: 9999;
  background: white;
}
</style>
