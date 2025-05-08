import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([])
  const setMenuList = (list) => {
    menuList.value = list
    //使用glob导入文件，获取项目下各组件路径
    // const modules = import.meta.glob('@/views/**/**/*.vue')

    // function routerSet(router) {
    //   router.forEach(route => {
    //     // 判断没有子菜单，拼接路由数据
    //     if (!route.children) {
    //       const url = `../views${route.meta.path}/index.vue`;
    //       route.component = modules[url]
    //     } else {
    //       routerSet(route.children)
    //     }
    //   })
    // }
    // routerSet(payload)
    // state.routerList = payload
  }

  return { menuList, setMenuList }
})
