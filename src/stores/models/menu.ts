import { defineStore } from 'pinia'
import { ref } from 'vue'

// 菜单项类型（可根据你的接口调整）
export interface MenuItem {
  id: number
  name: string
  path: string
  icon: string
  parent_id: number | null
  children?: MenuItem[]
}

export const useMenuStore = defineStore('menu', () => {
  // 当前用户有权限的菜单树（用于侧边栏渲染）
  const accessibleMenuList = ref<MenuItem[]>([])

  /**
   * 根据权限 ID 列表，从完整菜单中过滤出可访问的菜单树
   * @param fullMenuListRes 完整的菜单树（可从后端或静态资源获取）
   * @param permissions 用户拥有的菜单 ID 列表，如 [4,5,6,9]
   */
  function setMenuByPermissions(fullMenuListRes: MenuItem[], permissions: number[]) {
    const filter = (menus: MenuItem[]): MenuItem[] => {
      return menus
        .map((menu) => {
          const cloned = { ...menu }
          if (menu.children?.length) {
            cloned.children = filter(menu.children)
          }
          // 保留：自己有权限，或子节点有权限
          const hasPermission = permissions.includes(menu.id)
          const hasAllowedChildren = cloned.children && cloned.children.length > 0
          return hasPermission || hasAllowedChildren ? cloned : null
        })
        .filter((menu): menu is MenuItem => menu !== null)
    }

    accessibleMenuList.value = filter(fullMenuListRes)
  }

  /**
   * 清空菜单（登出时调用）
   */
  function clearMenu() {
    accessibleMenuList.value = []
  }

  return {
    accessibleMenuList,
    setMenuByPermissions,
    clearMenu,
  }
})
