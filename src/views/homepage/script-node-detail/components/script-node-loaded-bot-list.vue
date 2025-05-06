<script setup lang="ts">
import type {BotMetaInfo} from "@/types/vortexa-type.ts";
import {computed, onMounted, ref} from "vue";
import {openBotInstanceDetail} from "@/router/route-jump-methods.ts";

const props = defineProps<{
  scriptNodeName: string
  metaInfoMap: Record<string, BotMetaInfo>
  onlineBotNameToKeys: Record<string, Array<string>>
  botNameToBotKeys: Record<string, Array<string>>
}>()

const tableData = ref(null)

// 在线实例
const onlineInstance = computed(() => {
  return (botName) => {
    if (props.onlineBotNameToKeys && props.onlineBotNameToKeys[botName]) {
      return props.onlineBotNameToKeys[botName]
    } else {
      return []
    }
  }
})
// 存在的实例
const existInstance = computed(() => {
  return (botName) => {
    if (props.botNameToBotKeys && props.botNameToBotKeys[botName]) {
      return props.botNameToBotKeys[botName]
    } else {
      return []
    }
  }
})

// 打开bot详情页面
const openBotInstanceDetailPage = (botKey) => {
  openBotInstanceDetail(props.scriptNodeName, botKey)
}

// 打开创建bot页面
const openCreateBotInstancePage = (botName) => {

}


onMounted(() => {
  tableData.value = Object.values(props.metaInfoMap)
})
</script>

<template>
  <div v-if="metaInfoMap">
    <el-table
      style="width: 100%;"
      max-height="450"
      :data="tableData"
    >
      <el-table-column label="icon" width="80">
        <template #default="scope">
          <el-image
            v-if="scope.row.icon"
            :src="scope.row.icon"
            fit="cover"
            style="width: 28px; height: 28px; vertical-align: middle"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="bot name" filter>
        <template #default="scope">
          <el-text>
            {{ scope.row.botName }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column label="version" width="90">
        <template #default="scope">
          <el-tag type="success">
            {{ scope.row.version }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="instance count">
        <template #default="scope">
          <el-dropdown size="small">
            <el-tag class="button-morandi">
              {{ onlineInstance(scope.row.botName).length + '/' + existInstance(scope.row.botName).length }}
            </el-tag>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="botKey in existInstance(scope.row.botName)"
                  @click="openBotInstanceDetailPage(botKey)"
                  :key="botKey"
                >
                  {{ botKey}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column width="100" fixed="right">
        <template #default="scope">
          <el-button size="small"  type="success"
                     @click="openCreateBotInstancePage(scope.row.botName)"
          >
            create
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
