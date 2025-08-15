import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MenuItem } from './menu'

export const useHeaderStore = defineStore(
  'header', //没什么用，作为调试工具的唯一标识
  () => {
    const state = ref(false)
    const changeState = () => {
      state.value = !state.value //取反，改变aside状态
    }
    const tab = ref<MenuItem[]>([]) //定义一个空数组，用于存储tab数据
    const addTab = (menu: MenuItem) => {
      // 检查数组中是否已存在相同 path 的对象
      const isExist = tab.value.some((item) => item.path === menu.path)
      // 不存在则添加
      if (!isExist) {
        tab.value.push(menu)
      }
    }
    const delTab = (menu: MenuItem) => {
      tab.value = tab.value.filter((item) => item.path !== menu.path) //过滤掉已删除的元素
    }
    function reset() {
      tab.value = []
    }
    return { state, changeState, tab, addTab, delTab, reset }
  },
  {
    persist: true, //持久化存储，即使刷新页面，数据也不会丢失
  },
)
