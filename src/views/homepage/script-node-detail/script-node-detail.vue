<script setup lang="ts">
import {onMounted, type Ref, ref, watch} from "vue";
import {useRoute} from "vue-router";
import type {ScriptNodeDetail} from "@/types/vortexa-type.ts";
import {queryScriptNodeDetailNetwork} from "@/api/script-node.ts";
import ScriptNodeBaseInfo
  from "@/views/homepage/script-node-detail/components/script-node-base-info.vue";
import ContentBlock from "@/components/content-block/content-block.vue";
import ScriptNodeLoadedBotList
  from "@/views/homepage/script-node-detail/components/script-node-loaded-bot-list.vue";

const route = useRoute()

const scriptNodeName = ref('')
const scriptNodeDetail: Ref<ScriptNodeDetail> = ref(null)

const loading = ref(false)

// 查script node 详情
const queryScriptNodeDetail = () => {
  loading.value = true
  queryScriptNodeDetailNetwork(scriptNodeName.value).then(result => {
    if (result.success) {
      scriptNodeDetail.value = result.data
    }
  }).finally(() => loading.value = false)
}


// 进入页面，获取参数判断是否是进入当前页面，如果是尝试发送请求重新获取参数
const handleQueryChange = () => {
  if (route.query && route.query.data) {
    const data = JSON.parse(route.query.data)
    if (scriptNodeName.value === '' || scriptNodeName.value === data.scriptNodeName) {
      scriptNodeName.value = data.scriptNodeName

      queryScriptNodeDetail()
    }
  }
};

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
    <div v-loading="loading" v-if="scriptNodeDetail">
      <script-node-base-info
        style="overflow-x: scroll"
        :script-node="scriptNodeDetail.scriptNode"
      />
      <el-divider/>

      <script-node-loaded-bot-list
        :script-node-name="scriptNodeName"
        :meta-info-map="scriptNodeDetail.metaInfoMap"
        :online-bot-name-to-keys="scriptNodeDetail.onlineBotNameToKeys"
        :bot-name-to-bot-keys="scriptNodeDetail.botNameToBotKeys"
      />
    </div>
  </content-block>
</template>

<style scoped>

</style>
