import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AjariPrivacyPage from '../views/AjariPrivacyPage.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout
  },
  {
    path: '/ajari',
    name: 'AjariPrivacy',
    component: AjariPrivacyPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
