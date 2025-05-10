<script setup lang="ts">
import {onMounted, type Ref, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {queryBotInstanceNetwork} from "@/api/bot.ts";
import {BotInstanceDetail} from "@/types/vortexa-type.ts";
import BotInstanceInfo from "@/views/homepage/script-bot-instance-detail/components/bot-instance-info/bot-instance-info.vue";
import ContentBlock from "@/components/content-block/content-block.vue";
import BotInstanceExtraInfo
  from "@/views/homepage/script-bot-instance-detail/components/bot-instance-extra-info/bot-instance-extra-info.vue";

const route = useRoute()

const scriptNodeName = ref('')
const botKey = ref('')
const botInstanceDetail: Ref<BotInstanceDetail> = ref(null)

// 进入页面，获取参数判断是否是进入当前页面，如果是尝试发送请求重新获取参数
const handleQueryChange = () => {
  if (route.query && route.query.data) {
    const data = JSON.parse(route.query.data)
    if (
      (scriptNodeName.value === '' && botKey.value === '') ||
      (scriptNodeName.value === data.scriptNodeName && botKey.value === data.botKey)
    ) {
      scriptNodeName.value = data.scriptNodeName
      botKey.value = data.botKey
      if (botInstanceDetail.value === null) {
        queryBotInstance(scriptNodeName.value, botKey.value)
      }
    }
  }
};

// 查询bot实例
const queryBotInstance = (scriptNodeName, botKey) => {
  queryBotInstanceNetwork(scriptNodeName, botKey).then(result => {
    botInstanceDetail.value = result.data
  })
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
  <div class="script-bot-detail">
    <content-block>
      <template #header>
        <div style="text-align: center;font-size: 26px">{{botKey}}</div>
      </template>
      <template #default>
        <div>
          <el-divider/>
          <div v-if="botInstanceDetail">
            <bot-instance-info
              @reload-data="queryBotInstance(scriptNodeName, botKey)"
              :online="botInstanceDetail.online"
              :bot-info="botInstanceDetail.botInfo"
              :bot-instance="botInstanceDetail.botInstance"
              :job-triggers="botInstanceDetail.jobTriggers"
            />
          </div>
          <el-divider/>
          <div v-if="botInstanceDetail">
            <bot-instance-extra-info
              @reload-data="queryBotInstance(scriptNodeName, botKey)"
              :bot-instance="botInstanceDetail.botInstance"
              :bot-launch-config="botInstanceDetail.botLaunchConfig"
            />
          </div>
        </div>
      </template>
    </content-block>
  </div>
</template>

<style scoped>
.script-bot-detail {
  width: 100%;
}
</style>
