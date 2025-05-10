<script setup lang="ts">
import {Filter, RefreshRight} from '@element-plus/icons-vue'
import BotRuntimeDisplayCard from "@/views/homepage/script-bot/components/bot-runtime-display-card.vue";
import {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {onMounted, ref, nextTick, computed, reactive} from "vue";
import ContentBlock from "@/components/content-block/content-block.vue";
import {BotInstanceStatus} from "@/config/vortexa-config.ts";
import {pageQueryBotInstanceNetwork, startScriptJobNetwork} from "@/api/bot-instance.ts";
import {PageQuery, PageResult} from "@/types/vortexa-type-common.ts";
import {ElMessage} from "element-plus";


const filters = ref<{
  status: BotInstanceStatus
}>({status: BotInstanceStatus.ALL})

const botInstanceList = ref<Array<BotInstanceInfo>>([])

const displayInstanceList = computed(() => {
  console.log(botInstanceList.value)
  return botInstanceList.value.filter(info => {
    let filter: boolean = true
    if (filterValue.value != null) {
      filter = info.botName.includes(filterValue.value) || info.botKey.includes(filterValue.value)
    }
    if (filters.value.status != BotInstanceStatus.ALL) {
      filter = info.params['bot_instance_status'] == filters.value.status
    }
    return filter
  })
})

const isLoading = ref(false)
// 分页查询数据
const totalCount = ref(0)
const pageQuery = reactive(new PageQuery({
  page: 1,
  limit: 10,
  filterMap: new Map<string, object>()
}))


// 1. 过滤
// 过滤下拉框宽度
const dropdownWidth = ref(0)
const filterValue = ref('')


function filterByStatus(filterStatus: BotInstanceStatus) {
  filters.value.status = filterStatus
}

// 2.BotInstance
// 网络请求获取实例
const scrollQueryDisabled = ref(false)
const pageQueryBotInstance = () => {
  if (isLoading.value) return
  isLoading.value = true

  pageQueryBotInstanceNetwork(pageQuery)
    .then(result => {
      const pageResult: PageResult<BotInstanceInfo> = result.data
      botInstanceList.value.push(...pageResult.list)
      totalCount.value = pageResult.total

      console.log('page query bot instance', pageQuery, pageResult)
      pageQuery.page += 1

      if (pageResult.total == botInstanceList.value.length) {
        ElMessage({
          message: 'Total script loaded',
          type: 'warning',
        })
        scrollQueryDisabled.value = true
      }
    })
    .catch(() => {
      scrollQueryDisabled.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

// 开始运行script的某个job
const startScriptJob = (params) => {
  startScriptJobNetwork(params)
    .then(response => {
      console.log('start script job', response)
    })
}

const reload = () => {
  totalCount.value = 0
  pageQuery.page = 1
  pageQuery.limit = 10
  pageQuery.filterMap = new Map()
  botInstanceList.value = []
  pageQueryBotInstance()
}

onMounted(async () => {
  await nextTick()
  dropdownWidth.value = document.querySelector('.filter-button').offsetWidth
})
</script>

<template>
  <div class="vortexa-script-view">

    <!--    搜索块-->
    <content-block class="vortexa-script-viw-block-1">
      <div>
        <el-input v-model="filterValue" placeholder="Search by name"/>
        <div>
          <el-button
            style="width: 90px"
            @click="reload"
          >
            <el-icon>
              <RefreshRight/>
            </el-icon>
            Fresh
          </el-button>
          <el-dropdown
            trigger="click"
            placement="bottom"
            style="width:calc(100% - 90px); "
            :hide-on-click="false"
          >
            <el-button class="filter-button">
              <el-icon>
                <Filter/>
              </el-icon>
              Filter
            </el-button>
            <template #dropdown>
              <el-dropdown-menu class="filter-menu" :style="{'width': dropdownWidth + 'px'}">
                <el-dropdown-item>The Action 1st</el-dropdown-item>
                <el-dropdown-item>The Action 2st</el-dropdown-item>
                <el-dropdown-item>The Action 3st</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </content-block>

    <!--展示块-->
    <content-block class="vortexa-script-viw-block-2">
      <template #header>
        <el-button-group style="margin-bottom: 12px">
          <el-button
            type="info"
            @click="filterByStatus(BotInstanceStatus.ALL)"
            :disabled="filters.status == BotInstanceStatus.ALL"
          >
            All
          </el-button>
          <el-button
            type="success"
            @click="filterByStatus(BotInstanceStatus.RUNNING)"
            :disabled="filters.status == BotInstanceStatus.RUNNING"
          >
            Running
          </el-button>
          <el-button
            type="danger"
            @click="filterByStatus(BotInstanceStatus.STOPPED)"
            :disabled="filters.status == BotInstanceStatus.STOPPED"
          >
            Stopped
          </el-button>
        </el-button-group>
      </template>

      <div class="scroll-bar-wrapper" v-loading="isLoading">
        <div
          class="vortexa-script-display-content"
          v-infinite-scroll="pageQueryBotInstance"
          :infinite-scroll-disabled="scrollQueryDisabled"
        >
          <bot-runtime-display-card
            class="vortexa-script-item"
            v-for="botInstance in displayInstanceList"
            :key="botInstance.botKey"
            :bot-instance="botInstance"
            @start-script-job="startScriptJob"
          />
        </div>
        <el-backtop target=".scroll-bar-wrapper" :bottom="100" :right="100">
        </el-backtop>
      </div>

      <span style="float: right;font-size: 14px; font-weight: 600">
        Total:{{ totalCount }}
      </span>
    </content-block>
  </div>
</template>

<style scoped>

.vortexa-script-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
}

.vortexa-script-viw-block-1 {
  max-width: 500px;
  height: 70px;
}

.vortexa-script-viw-block-2 {
  padding-bottom: 60px;
}

.scroll-bar-wrapper {
  height: calc(100vh - 260px);
  overflow-y: scroll;
}

.vortexa-script-display-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-items: start;
}

.scroll-bar-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scroll-bar-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}


.vortexa-script-item {
  flex: 1 0 calc((100% - 30px) / 5);
}

.filter-button {
  width: 100%;
}

.filter-menu {
  min-width: 200px;
}

@media (min-width: 1980px) {
  .vortexa-script-view {
    display: flex;
    flex-direction: row-reverse;
    height: calc(100vh - 100px);
    gap: 10px;
  }

  .vortexa-script-viw-block-2 {
    width: calc(100% - 250px);
    height: calc(100vh - 100px);
  }
}
</style>
