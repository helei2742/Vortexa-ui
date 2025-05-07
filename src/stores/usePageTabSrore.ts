import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {type Ref, ref} from "vue";
import {PageTabInfo} from "@/types/vortexa-type-common.ts";

export const usePageTabStore = defineStore('pageTab', () => {
  const router = useRouter()

  const pageList: Ref<Array<PageTabInfo>> = ref([new PageTabInfo({
    path: 'introduce',
    id: 'introduce',
    icon: 'introduce'
  })])
  const currentPage: Ref<PageTabInfo | null> = ref(null)

  // 路由到隐藏页
  const routeToHiddenPage = ({path, id, payload, icon}) => {
    let indexOf = pageList.value.findIndex(item => item.path === path && item.id === id)
    console.log('route payload', indexOf, pageList.value)

    if (indexOf === -1) {
      const pageTab = new PageTabInfo({path, id, payload, icon})
      pageList.value.push(pageTab)
      indexOf = pageList.value.length - 1
    }
    const pageTab = pageList.value[indexOf]
    currentPage.value = pageTab
    router.push({name: path, query: {data: JSON.stringify(pageTab.payload)}})
  }

  // 移除隐藏页
  const removeHiddenPage = ({path, id}) => {
    const indexOf = pageList.value.findIndex(item => item.path === path && item.id === id)
    console.log('remove', indexOf)
    if (indexOf !== -1) {
      pageList.value.splice(indexOf, 1)
      const lastIdx = pageList.value.length - 1
      if (lastIdx >= 0) {
        const pageTab = pageList.value[lastIdx]
        router.push({name: path, query: {data: JSON.stringify(pageTab.payload)}})
      } else {
        router.push('/')
      }
    }
  }

  return {pageList, routeToHiddenPage, currentPage, removeHiddenPage}
})
