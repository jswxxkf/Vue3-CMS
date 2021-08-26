import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/cache'
import type { RouteRecordRaw } from 'vue-router'
import { firstMenu } from '@/utils/mapMenus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue'),
    // children: 根据userMenus动态决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/notFound/NotFound.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 全局导航守卫
router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
