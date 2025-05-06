<script setup lang="ts">
import {RefreshRight, FullScreen} from "@element-plus/icons-vue";
import {RichTextType} from "@/types/richTextType.ts";
import RichText from "@/components/rich-text/rich-text.vue";
import {ref} from "vue";
import VortexaIcon from "@/components/vortexa-icon.vue";
import {ElMessage} from "element-plus";

const props = defineProps<{
  botLaunchConfig: string
}>()

const launchConfigRichText = ref()

const emit = defineEmits(['reload-data', 'save-launch-config'])

// 刷新
const reloadData = () => {
  emit('reload-data')
}
// 保存
const saveLaunchConfig = () => {
  const newConfig = launchConfigRichText.value.textContent
  if (props.botLaunchConfig === newConfig) {
    ElMessage.info({
      message: 'config did not edited'
    })
  } else {
    emit('save-launch-config', newConfig)
  }
}

const isFullScreen = ref(false)

</script>

<template>
  <div>
    <div class="clearfix" style="margin-bottom: 6px;">
      <el-text style="line-height: 32px;vertical-align: bottom;"
               type="danger"
               truncated>
        Tips: [botName、botKey] not need edit
      </el-text>
      <el-button-group style="float: right">
        <el-button @click="saveLaunchConfig">
          <vortexa-icon name="save" size="14"/>
        </el-button>
        <el-button @click="reloadData">
          <el-icon>
            <RefreshRight/>
          </el-icon>
        </el-button>
        <el-button @click="isFullScreen = true">
          <el-icon>
            <FullScreen/>
          </el-icon>
        </el-button>
      </el-button-group>
    </div>
    <rich-text
      ref="launchConfigRichText"
      class="rich-text-wrapper"
      :class="{ 'rich-text-fullscreen': isFullScreen }"
      :textType="RichTextType.yaml"
      :content="botLaunchConfig"
    />

    <el-button v-if="isFullScreen"
               type="text"
               class="fullscreen-button"
               @click="isFullScreen = false">
      <vortexa-icon name="fullscreen-exit" size="24"/>
    </el-button>
  </div>
</template>

<style scoped>
.rich-text-wrapper {
  height: 400px;
  border: 1px solid #ccc;
}

.rich-text-fullscreen {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh !important;
  width: 100vw !important;
  z-index: 9999;
  background: white;
}

.fullscreen-button {
  position: fixed !important;
  top: 10px;
  right: 10px;
  height: 30px;
  width: 30px;
  z-index: 9999;
  color: #4a4a4a;
}

</style>
