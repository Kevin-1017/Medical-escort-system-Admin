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
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/dashboard',

      // redirect: to => {
      //   if (localStorage.getItem('v3pz')) {
      //     // 如果存在二级菜单
      //     const child = JSON.parse(localStorage.getItem('v3pz')).menu.routerList[0].children
      //     if (child) {
      //       return child[0].meta.path
      //     } else {
      //       return JSON.parse(localStorage.getItem('v3pz')).menu.routerList[0].meta.path
      //     }
      //   } else {
      //     return '/dashboard'
      //   }
      // },

      children: [
        {
          path: '/dashboard',
          meta: {
            //这里meta是为了方便router拿到路由信息
            id: '1',
            name: '控制台',
            icon: 'Platform',
            path: '/dashboard', //这里加 / 是让router.push每次都从根路径出发，而不是叠加路径，不然会空白页
            describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据',
          },
          component: () => import('@/views/dashboard/dashboard.vue'),
        },
        {
          path: 'auth',
          meta: { id: '2', name: '权限管理', icon: 'Grid', path: '/auth' },
          redirect: '/auth/admin', //重定向到子路由
          children: [
            {
              path: 'admin', //如果是/auth则自动匹配空路径子路由
              //alias: ['admin'], // 允许通过 /auth/admin 访问同一组件，实现多入口兼容性
              meta: {
                id: '1',
                name: '账号管理',
                icon: 'Avatar',
                path: '/auth/admin',
                describe: '管理员可以进行编辑，权限修改后需要登出才会生效',
              },
              component: () => import('@/views/auth/admin/admin.vue'),
            },
            {
              path: 'group',
              meta: {
                id: '2',
                name: '菜单管理',
                icon: 'Menu',
                path: '/auth/group',
                describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取',
              },
              component: () => import('@/views/auth/group/group.vue'),
            },
          ],
        },
        {
          path: 'system',
          meta: { id: '3', name: '智护云陪诊', icon: 'BellFilled', path: '/system' }, //动态路由后端是否会使用?
          redirect: '/system/staff', //重定向到陪护管理
          children: [
            {
              path: 'staff',
              //alias: ['staff'],
              meta: {
                id: '1',
                name: '陪护管理',
                icon: 'Checked',
                path: '/system/staff',
                describe: '陪护师可以进行创建和修改,设置对应生效状态控制C端选择',
              },
              component: () => import('@/views/system/staff/staff.vue'),
            },
            {
              path: 'order',
              meta: {
                id: '2',
                name: '订单管理',
                icon: 'List',
                path: '/system/order',
                describe: 'C端下单后可以查看所有订单状态,已支付的订单可以完成陪护状态修改',
              },
              component: () => import('@/views/system/order/order.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
