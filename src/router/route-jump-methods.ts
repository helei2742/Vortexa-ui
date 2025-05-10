export const openBotInstanceDetail = async (scriptNodeName, botKey) => {
  const {usePageTabStore} = await import('@/stores/usePageTabStore.ts');
  const {routeToHiddenPage} = usePageTabStore(); // 此时 pinia 已激活


  routeToHiddenPage({
    path: 'bot_detail',
    id: botKey,
    icon: 'robot',
    payload: {
      scriptNodeName,
      botKey
    }
  })
}

export const openBotInstanceCreatePage = async (scriptNodeName, botName) => {
  const {usePageTabStore} = await import('@/stores/usePageTabStore.ts');
  const {routeToHiddenPage} = usePageTabStore(); // 此时 pinia 已激活

  routeToHiddenPage({
    path: 'bot_create',
    id: botName,
    icon: 'create-script',
    payload: {
      scriptNodeName,
      botName
    }
  })
}


export const openScriptNodeDetail = async (scriptNodeName) => {
  const {usePageTabStore} = await import('@/stores/usePageTabStore.ts');
  const {routeToHiddenPage} = usePageTabStore(); // 此时 pinia 已激活

  routeToHiddenPage({
    path: 'script_node_detail',
    id: scriptNodeName,
    icon: 'cluster',
    payload: {
      scriptNodeName
    }
  })
}
