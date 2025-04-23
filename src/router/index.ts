import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/storage',
  // },
  {
    path: '/',
    redirect: '/storage',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/picking',
        name: 'picking',
        component: () => import('@/views/ctc/picking/index.vue'),
        meta: {
          title: 'ctc拣选大屏'
        }
      },
      {
        path: '/storage',
        name: 'storage',
        component: () => import('@/views/ctc/storage/index.vue'),
        meta: {
          title: 'ctc入库大屏'
        }
      },
      {
        path: '/mainControlRoom',
        name: 'mainControlRoom',
        component: () => import('@/views/ctc/mainControlRoom/index.vue'),
        meta: {
          title: '总控室数据报表'
        }
      }
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next();
})

export default router
