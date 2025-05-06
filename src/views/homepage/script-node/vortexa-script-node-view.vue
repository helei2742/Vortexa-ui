<script setup lang="ts">
import {MoreFilled, Refresh} from "@element-plus/icons-vue"
import ContentBlock from "@/components/content-block/content-block.vue";
import {queryAllRegisteredScriptNodeNetwork} from "@/api/script-node.ts";
import {onMounted, ref} from "vue";
import {ScriptNode} from "@/types/vortexa-type.ts";
import ScriptNodeTableCard from "@/views/homepage/script-node/components/script-node-table-card.vue";
import {openBotInstanceDetail, openScriptNodeDetail} from "@/router/route-jump-methods.ts";

const scriptNodeList = ref()

const scriptNodeStatus = ({row}) => {
  if (row.online) {
    return 'script-node-online'
  } else {
    return 'script-node-offline'
  }
}

const ipTagName = (scriptNode: ScriptNode) => {
  if (scriptNode.online) {
    return 'success'
  } else {
    return 'info'
  }
}

// 查询全部
const queryAllRegisteredScriptNode = () => {
  queryAllRegisteredScriptNodeNetwork().then(result => {
    scriptNodeList.value = result.data
  })
}

// 刷新
const handleRefresh = () => {
  queryAllRegisteredScriptNode()
}

onMounted(async () => {
  queryAllRegisteredScriptNode()
})
</script>

<template>
  <content-block class="vortexa-script-node-view">
    <div class="script-node-list">
      <el-table
        class="script-node-table"
        :data="scriptNodeList"
        :row-class-name="scriptNodeStatus"
        table-layout="fixed"
        :show-overflow-tooltip="true"
        border
        height="500"
        fit
      >
        <el-table-column type="expand">
          <template #default="props">
            <script-node-table-card
              @open-script-node-detail="openScriptNodeDetail"
              @open-bot-detail="openBotInstanceDetail"
              :script-node="props.row"
            />
          </template>
        </el-table-column>

        <el-table-column label="nodeName" sortable min-width="160">
          <template #default="scope">
            <el-link  @click="openScriptNodeDetail(scope.row.scriptNodeName)">
              {{ scope.row.scriptNodeName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="groupId" sortable min-width="160">
          <template #default="scope">
            {{ scope.row.groupId }}
          </template>
        </el-table-column>
        <el-table-column prop="serviceId" sortable label="ServiceId" min-width="160">
          <template #default="scope">
            {{ scope.row.serviceId }}
          </template>
        </el-table-column>
        <el-table-column prop="instanceId" sortable label="InstanceId" min-width="160">
          <template #default="scope">
            {{ scope.row.instanceId }}
          </template>
        </el-table-column>
        <el-table-column label="ip" sortable min-width="160">
          <template #default="scope">
            <el-tag :type="ipTagName(scope.row)">
              {{ scope.row.host + ':' + scope.row.port }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="bot count" sortable min-width="160">
          <template #default="scope">
            {{ scope.row.managedBotKeyList.length }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="90">
          <template #header>
            <el-button :icon="Refresh" plain type="success" @click="handleRefresh"></el-button>
          </template>
          <template #default="scope">
            <el-dropdown placement="bottom-end">
              <el-button text type="info" size="large" style="font-size: 22px">
                <el-icon>
                  <MoreFilled/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Setting</el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.online"
                    style="color: red"
                  >
                    Stop
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-else
                    style="color: greenyellow"
                  >
                    Start
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </content-block>
</template>

<style scoped>

.vortexa-script-node-view {
  height: calc(100vh - 240px);
}

.script-node-list {
  position: relative;

}

.script-node-table {
  position: absolute;
}

:deep(.el-table .script-node-online) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

:deep(.el-table .script-node-offline) {
  --el-table-tr-bg-color: var(--el-color-info-light-7);
}
</style>
