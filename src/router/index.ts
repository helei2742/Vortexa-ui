import {createRouter, createWebHistory} from 'vue-router'
import VortexaHomePage from "@/views/homepage/vortexa-home-page.vue"
import DashBoard from '@/views/homepage/dashboard/vortexa-dashboard-view.vue'
import Account from '@/views/homepage/account/vortexa-account-view.vue'
import Environment from '@/views/homepage/environment/vortexa-environment-view.vue'
import Wallet from '@/views/homepage/wallet/vortexa-wallet-view.vue'
import Script from '@/views/homepage/script-bot/vortexa-script-view.vue'
import ScriptNode from '@/views/homepage/script-node/vortexa-script-node-view.vue'
import Setting from '@/views/homepage/setting/vortexa-setting-view.vue'

import VortexaIntroduce from "@/views/homepage/introduce/vortexa-introduce.vue";
import BotDetail from '@/views/homepage/script-bot-detail/script-bot-detail.vue'

export const hiddenHomePageRoutes = [
  {
    path: 'introduce',
    component: VortexaIntroduce,
    name: 'introduce',
    meta: {
      title: 'Introduce',
      keepAlive: true,
      hidden: true
    }
  },
  {
    path: 'bot_detail',
    component: BotDetail,
    name: 'bot_detail',
    meta: {
      title: 'BotDetail',
      keepAlive: true,
      hidden: true
    }
  }
]

const routes = [
  {
    path: '/',
    redirect: "/homepage",
  },
  {
    path: '/homepage',
    component: VortexaHomePage,
    redirect: "/homepage/dashboard",
    meta: {title: 'HomePage'},
    children: [
      {
        path: 'dashboard',
        component: DashBoard,
        meta: {
          title: 'DashBoard',
          keepAlive: true
        }
      },
      {
        path: 'account',
        component: Account,
        meta: {
          title: 'Account',
          keepAlive: true
        }
      },
      {
        path: 'environment',
        component: Environment,
        meta: {
          title: 'Environment',
          keepAlive: true
        }
      },
      {
        path: 'wallet',
        component: Wallet,
        meta: {
          title: 'Wallet',
          keepAlive: true
        }
      },
      {
        path: 'script',
        component: Script,
        meta: {
          title: 'Script',
          keepAlive: true
        }
      },
      {
        path: 'script_node',
        component: ScriptNode,
        meta: {
          title: 'ScriptNode',
          keepAlive: true
        }
      },
      {
        path: 'setting',
        component: Setting,
        meta: {
          title: 'Setting',
          keepAlive: true
        }
      },
      ...hiddenHomePageRoutes
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
