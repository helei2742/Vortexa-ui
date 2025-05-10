<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {openBotInstanceCreatePage, openBotInstanceDetail} from "@/router/route-jump-methods.ts";
import type {BotInfo} from "@/types/vortexa-type.ts";
import {PageQuery} from "@/types/vortexa-type-common.ts";
import {pageQueryBotInfoNetwork} from "@/api/bot-info.ts";

const props = defineProps<{
  scriptNodeName: string
  loadedBotInfos: Array<string>
  onlineBotNameToKeys: Record<string, Array<string>>
  botNameToBotKeys: Record<string, Array<string>>
}>()

const botInfos: Ref<Array<BotInfo>> = ref([])

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

// 是否加载例bot info
const isLoadedBotInfo = computed(() => {
  return (botName) => {
    return props.loadedBotInfos.indexOf(botName) !== -1
  }
})


const countColor = computed(() => {
  return (botName) => {
    if (existInstance.value(botName).length == 0) {
      return '#ced0d5'
    }
    if ((onlineInstance.value(botName).length == existInstance.value(botName).length)) {
      return '#91f95b'
    }
    return '#f9937f'
  }
})

// 打开bot详情页面
const openBotInstanceDetailPage = (botKey) => {
  openBotInstanceDetail(props.scriptNodeName, botKey)
}

// 打开创建bot页面
const openCreateBotInstancePage = (botName) => {
  openBotInstanceCreatePage(props.scriptNodeName, botName)
}


const loading = ref(false)
// 分页参数
const pageQuery: Ref<PageQuery> = ref(new PageQuery({
  page: 1,
  limit: 15,
  filterMap: {}
}))
const total = ref(0)

// 查询bot info
const pageQueryBotInfos = () => {
  loading.value = true
  pageQuery.value.filterMap ??= {}
  pageQuery.value.filterMap['botNames'] = Object.keys(props.botNameToBotKeys)

  pageQueryBotInfoNetwork(pageQuery.value).then(result => {
    if (result.success) {
      const pageResult = result.data;
      botInfos.value = pageResult.list
      total.value = pageResult.total
    }
  }).finally(() => loading.value = false)
}

onMounted(() => {
  pageQueryBotInfos()
})
</script>

<template>
  <div v-loading="loading">
    <el-table
      style="width: 100%;"
      max-height="450"
      :data="botInfos"
    >
      <el-table-column label="icon" width="80">
        <template #default="scope">
          <el-image
            v-if="scope.row.image"
            :src="scope.row.image"
            fit="cover"
            style="width: 28px; height: 28px; vertical-align: middle"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="name" filter>
        <template #default="scope">
          <el-text>
            {{ scope.row.name }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column label="version" width="90">
        <template #default="scope">
          <el-tag type="success">
            {{ scope.row.versionCode }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="instance count">
        <template #default="scope">
          <el-dropdown size="small">
            <el-button
                       size="small"
                       :style="{'backgroundColor':countColor(scope.row.name)}"
            >
              {{
                onlineInstance(scope.row.name).length + '/' + existInstance(scope.row.name).length
              }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="botKey in existInstance(scope.row.name)"
                  @click="openBotInstanceDetailPage(botKey)"
                  :key="botKey"
                >
                  {{ botKey }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column width="100" fixed="right">
        <template #default="scope">
          <el-button size="small" type="success"
                     v-if="isLoadedBotInfo(scope.row.name)"
                     @click="openCreateBotInstancePage(scope.row.name)"
          >
            create
          </el-button>
          <el-button size="small" type="warning"
                     v-else
          >
            load
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="clearfix" style="margin-top: 10px">
      <el-pagination
        style="float:right;"
        v-model:current-page="pageQuery.page"
        v-model:page-size="pageQuery.limit"
        :page-sizes="[15, 25, 50, 100]"
        size="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="pageQueryBotInfos"
        @current-change="pageQueryBotInfos"
      />
    </div>
  </div>
</template>

<style scoped>
.t{
  background-color: #f9937f;
  color: #91f95b;
}
</style>
