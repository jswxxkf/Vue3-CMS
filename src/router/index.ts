import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/cache'
import type { RouteRecordRaw } from 'vue-router'
import { firstMenu } from '@/utils/mapMenus'

// 初始路由配置仅包含login和main，其余的全部根据角色权限动态生成！
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // 在react-router-config中，没有直接配置重定向的属性，
    // 而是需要使用 render: () => <Redirect to="/path" /> 来完成
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

// 在react-router中，需要通过react-router-config提供的renderRoutes()来使用配置好的路由信息
// 并且，若为render子路由，则需要从当前组件props中取到当前路由，通过route.routes方式拿到子路由信息
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 全局导航守卫
router.beforeEach((to, from) => {
  // 非派发登录，则校验token
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      // 不再通过是否放行，即不再通过是否调用next()的方式来决定最终去向
      return '/login'
    }
  }
  if (to.path === '/main') {
    // 返回对应用户(权限)的首个菜单的url
    return firstMenu.url
  }
})

export default router
