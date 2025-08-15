import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      id: null,
      role: '',
      phoneNumber: '',
      name: '',
    })
    const reset = () => {
      userInfo.value = {
        id: null,
        role: '',
        phoneNumber: '',
        name: '',
      }
    }
    return {
      userInfo,
      reset,
    }
  },
  {
    persist: true, //持久化存储，即使刷新页面，数据也不会丢失，自动保存到本地存储
  },
)
