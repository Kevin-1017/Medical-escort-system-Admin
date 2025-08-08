import { getMenuByName, getMenuList } from '@/api'
import { useMenuStore } from '@/stores'

const menuStore = useMenuStore()
// 关联到角色菜单权限改动的工具函数
export async function updateMenu(role: string) {
  const [permissions, fullMenuList] = await Promise.all([
    getMenuByName({ name: role }),
    getMenuList(),
  ])

  menuStore.setMenuByPermissions(fullMenuList.data, permissions.data)
}
