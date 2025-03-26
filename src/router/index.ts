import {createRouter, createWebHistory} from 'vue-router'
import DashBoard from '@/views/dashboard/index.vue';

const routes = [
  {path: '/', redirect:"/dashboard"},
  {path: '/dashboard', component: DashBoard},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
