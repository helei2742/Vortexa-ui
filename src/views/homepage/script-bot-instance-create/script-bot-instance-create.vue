<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

// 进入页面，获取参数判断是否是进入当前页面，如果是尝试发送请求重新获取参数
const scriptNodeName = ref('')
const botName = ref('')

const handleQueryChange = () => {
  if (route.query && route.query.data) {
    const data = JSON.parse(route.query.data)
    if (
      (scriptNodeName.value === '' && botName.value === '') ||
      (scriptNodeName.value === data.scriptNodeName && botName.value === data.botName)
    ) {
      scriptNodeName.value = data.scriptNodeName
      botName.value = data.botName
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
<div>
  {{scriptNodeName}}-{{botName}}
</div>
</template>

<style scoped>

</style>
