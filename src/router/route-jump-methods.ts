export const openBotInstanceDetail = async (scriptNodeName, botKey) => {
  const {usePageTabStore} = await import('@/stores/usePageTabSrore.ts');
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

export const openScriptNodeDetail = async (scriptNodeName) => {
  const {usePageTabStore} = await import('@/stores/usePageTabSrore.ts');
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
