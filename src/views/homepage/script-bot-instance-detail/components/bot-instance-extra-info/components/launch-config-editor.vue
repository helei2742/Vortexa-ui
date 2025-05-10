<script setup lang="ts">
import {RefreshRight} from "@element-plus/icons-vue";
import VortexaIcon from "@/components/vortexa-icon.vue";
import {ElMessage} from "element-plus";
import {onMounted, ref, watch} from "vue";
import DynamicRowInputCard from "@/views/homepage/components/dynamic-row-input-card.vue";
import equal from "fast-deep-equal/es6";

const props = defineProps<{
  botLaunchConfig: Record<string, never>
}>()

const launchConfigRef = ref()

const editBotLaunchConfig = ref(null)

const emit = defineEmits(['reload-data', 'save-launch-config'])

// 刷新
const reloadData = () => {
  emit('reload-data')
}
// 保存
const saveLaunchConfig = () => {
  const newBotLaunchConfig = launchConfigRef.value.getKeyValues()
  if (equal(newBotLaunchConfig, props.botLaunchConfig)) {
    ElMessage.info({
      message: 'config did not edited'
    })
  } else {
    emit('save-launch-config', newBotLaunchConfig)
  }
}

onMounted(() => {
  editBotLaunchConfig.value = props.botLaunchConfig
})

watch(
  () => props.botLaunchConfig,
  (newValue) => {
    editBotLaunchConfig.value = newValue
  }
)
</script>

<template>
  <div>
    <div class="clearfix" style="margin-bottom: 6px;">
      <el-button-group style="float: right">
        <el-button @click="saveLaunchConfig">
          <vortexa-icon name="save" size="14"/>
        </el-button>
        <el-button @click="reloadData">
          <el-icon>
            <RefreshRight/>
          </el-icon>
        </el-button>
      </el-button-group>
    </div>

    <dynamic-row-input-card
      ref="launchConfigRef"
      v-if="botLaunchConfig"
      :key-values="botLaunchConfig"
    />

  </div>
</template>

<style scoped>

</style>
