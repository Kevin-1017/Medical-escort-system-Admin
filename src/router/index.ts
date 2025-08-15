import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/views/layout/layoutContainer.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import('@/views/dashboard/dashboard.vue'),
        },
        {
          path: '/auth',
          redirect: '/auth/admin',
          children: [
            {
              path: 'admin',
              component: () => import('@/views/auth/admin/admin.vue'),
            },
            {
              path: 'group',
              component: () => import('@/views/auth/group/group.vue'),
            },
          ],
        },
        {
          path: '/system',
          redirect: '/system/staff',
          children: [
            {
              path: 'staff',
              component: () => import('@/views/system/staff/staff.vue'),
            },
            {
              path: 'order',
              component: () => import('@/views/system/order/order.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
