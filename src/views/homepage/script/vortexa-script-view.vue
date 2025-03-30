<script setup lang="ts">
import {Filter, RefreshRight} from '@element-plus/icons-vue'
import BotRuntimeDisplayCard from "@/views/homepage/script/components/bot-runtime-display-card.vue";
import {BotInstanceInfo} from "@/types/vortexa-type.ts";
import {onMounted, ref, nextTick, computed} from "vue";
import ContentBlock from "@/components/content-block/content-block.vue";
import {BotInstanceStatus} from "@/config/vortexa-config.ts";

const botInstanceList = ref<Array<BotInstanceInfo>>([])

const filters = ref<{
  status: number
}>({status: BotInstanceStatus.ALL})

const displayInstanceList = computed(() => {
  return botInstanceList.value.filter(info => {
    let filter: boolean = true
    if (filterValue.value != null) {
      filter = info.botName.includes(filterValue.value) || info.botKey.includes(filterValue.value)
    }
    if (filters.value.status != BotInstanceStatus.ALL) {
      filter = info.botStatus == filters.value.status
    }
    console.log(filter)
    return filter
  })
})

// 1. 过滤
// 过滤下拉框宽度
const dropdownWidth = ref(0)
const filterValue = ref('')


function filterByStatus(filterStatus: BotInstanceStatus) {
  filters.value.status = filterStatus.valueOf()
}

// 2.BotInstance
// 网络请求获取实例
const pageQueryBotInstanceNetwork = () => {
  botInstanceList.value.push(new BotInstanceInfo({botKey: 'bot', botStatus: 0}))
  botInstanceList.value.push(new BotInstanceInfo({botKey: 'bot', botStatus: 1}))
  botInstanceList.value.push(new BotInstanceInfo({botKey: 'bot', botStatus: -1}))
  for (let i = 0; i < 10; i++) {
    botInstanceList.value.push(new BotInstanceInfo({botKey: 'bot' + i}))
  }
}

onMounted(async () => {
  await nextTick()
  dropdownWidth.value = document.querySelector('.filter-button').offsetWidth
  pageQueryBotInstanceNetwork()
})
</script>

<template>
  <div class="vortexa-script-view">

    <!--    搜索块-->
    <content-block class="vortexa-script-viw-block-1">
      <div>
        <el-input v-model="filterValue" placeholder="Search by name"/>
        <div>
          <el-button style="width: 90px">
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
        <div style="margin-bottom: 12px">
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
          <span style="float: right;font-size: 14px; font-weight: 300">Total:</span>
        </div>
      </template>
      <div class="scroll-bar-wrapper">
        <div class="vortexa-script-display-content" v-infinite-scroll="pageQueryBotInstanceNetwork">
          <bot-runtime-display-card
            v-for="botInstance in displayInstanceList"
            :key="botInstance.botKey"
            :bot-instance="botInstance"
            class="vortexa-script-item"
          />
        </div>
        <el-backtop target=".scroll-bar-wrapper" :bottom="100" :right="100">
        </el-backtop>
      </div>
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

}

.scroll-bar-wrapper {
  height: 900px;
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
    height: calc(100vh - 130px);
    gap: 10px;
  }

  .vortexa-script-viw-block-2 {
    width: calc(100% - 250px);
  }
}
</style>
