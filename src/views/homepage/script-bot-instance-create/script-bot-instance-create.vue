<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import ContentBlock from "@/components/content-block/content-block.vue";
import CreateBotInstanceForm
  from "@/views/homepage/script-bot-instance-create/components/create-bot-instance-form.vue";
import BotInfoDescription
  from "@/views/homepage/script-bot-instance-create/components/bot-info-description.vue";
import {BotLaunchConfig} from "@/types/vortexa-type.ts";
import {createBotLaunchConfigNetwork} from "@/api/bot-instance.ts";
import {ElMessage} from "element-plus";

const route = useRoute()
const botInfoRef = ref()

// 进入页面，获取参数判断是否是进入当前页面，如果是尝试发送请求重新获取参数
const scriptNodeName = ref('')
const botName = ref('')

const handleQueryChange = () => {
  if (route.path.endsWith('bot_create') && route.query && route.query.data) {
    const data = JSON.parse(route.query.data)
    if (
      (scriptNodeName.value === '' && botName.value === '')
    ) {
      scriptNodeName.value = data.scriptNodeName
      botName.value = data.botName

      botInfoRef.value.queryBotInfo(botName.value)
    }
  }
};

const loading = ref(false)
const createBotInstanceHandle = (createForm: BotLaunchConfig) => {
  loading.value = true
  createBotLaunchConfigNetwork(createForm).then(result => {
    if (result.success) {
      ElMessage.success({
        message: 'create bot instance success'
      })
    }
  }).finally(() => loading.value = false)
}

// 1. 组件加载时调用
onMounted(() => {
  handleQueryChange();
});

// 2. 监听 query 参数变化
watch(
  () => route.query,
  () => {
    handleQueryChange();
  },
  {deep: true}
);
</script>

<template>
  <content-block>
    <bot-info-description
      ref="botInfoRef"
      :bot-name="botName"/>
    <el-divider/>
    <create-bot-instance-form
      class="create-form"
      @createHandle="createBotInstanceHandle"
      :script-node-name="scriptNodeName"
      :bot-name="botName"
    />
  </content-block>
</template>

<style scoped>
.create-form {
  max-width: 500px;
  margin: 0 auto 0 0;
}
</style>
