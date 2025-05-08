import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeaderStore = defineStore(
  'header', //没什么用，作为调试工具的唯一标识
  () => {
    const state = ref(false)
    const changeState = () => {
      state.value = !state.value //取反，改变aside状态
    }
    const tab = ref([]) //定义一个空数组，用于存储tab数据
    const addTab = (meta) => {
      // 检查数组中是否已存在相同 path 的对象
      const isExist = tab.value.some((item) => item.path === meta.path)
      // 不存在则添加
      if (!isExist) {
        tab.value.push(meta)
      }
    }
    const delTab = (meta) => {
      // 找到要删除的元素的索引，如果存在则删除该元素
      // const index = tab.value.findIndex((item) => item.path === meta.path)
      // if (index > -1) {
      //   tab.value.splice(index, 1)
      // }
      tab.value = tab.value.filter((item) => item.path !== meta.path) //过滤掉已删除的元素
    }
    return { state, changeState, tab, addTab, delTab }
  },
  {
    persist: true, //持久化存储，即使刷新页面，数据也不会丢失
  },
)
