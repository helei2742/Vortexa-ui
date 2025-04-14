import {createRouter, createWebHistory} from 'vue-router'
import VortexaHomePage from "@/views/homepage/vortexa-home-page.vue"
import DashBoard from '@/views/homepage/dashboard/vortexa-dashboard-view.vue'
import Account from '@/views/homepage/account/vortexa-account-view.vue'
import Environment from '@/views/homepage/environment/vortexa-environment-view.vue'
import Script from '@/views/homepage/script-bot/vortexa-script-view.vue'
import ScriptNode from '@/views/homepage/script-node/vortexa-script-node-view.vue'
import Setting from '@/views/homepage/setting/vortexa-setting-view.vue'

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
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
