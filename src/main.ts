import { createApp } from 'vue'
import pinia from '@/stores/index' //pinia 独立维护，就不在这里维护了，在stores/index.js中维护，这里直接使用pinia
import App from './App.vue'
import router from './router/index'
import '@/assets/css/global.css' //引入全局css样式

import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入element-plus图标库

const app = createApp(App)
//全局注册element-plus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 路由守卫，全局拦截路由
router.beforeEach((to) => {
  const token = localStorage.getItem('a_token')
  // 不是登陆页面，且token不存在
  if (to.path !== '/login' && !token) {
    return '/login'
  } else if (token && to.path === '/login') {
    // 已登录状态访问login跳转首页
    return '/dashboard'
  } else {
    return true
  }
})

app.use(pinia)
app.use(router)

app.mount('#app')
