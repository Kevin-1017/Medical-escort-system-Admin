<script setup>
import { useHeaderStore, useMenuStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Expand, Fold } from '@element-plus/icons-vue' // 明确导入图标组件
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue' // 明确导入 nextTick
const headerStore = useHeaderStore()
const menuStore = useMenuStore()
//点击按钮切换侧边栏状态
const changeState = () => {
  headerStore.changeState()
}

//正确解构响应式状态,storeToRefs 会保持响应性，将 state 转换为 isCollapse 的 ref 对象
const { state: isCollapse, tab } = storeToRefs(headerStore)
//拿到当前路由信息
const route = useRoute()
//获取路由实例，用于跳转页面
const router = useRouter()
const closeTab = async (item, index) => {
  //注意删除的这个方法先执行
  headerStore.delTab(item)

  // 删除非当前页标签的跳转逻辑
  if (item.path !== route.path) return
  // 等待 Pinia 状态和 DOM 更新
  await nextTick()

  // 计算安全索引（需在 nextTick 后获取最新数组）tab.value.length是会实时更新的
  const safeIndex = Math.min(index, tab.value.length - 1)
  const target = tab.value[safeIndex]?.path

  // 空值兜底逻辑
  if (target) {
    router.push(target)
  } else {
    router.push('/dashboard') // 跳转默认页
  }
}
const handleClick = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('a_token')
    localStorage.removeItem('userInfo')
    menuStore.clearMenu()
    router.push('/login')
  }
}
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {}
</script>

<template>
  <div class="header-container">
    <div class="left">
      <el-icon class="icon" size="25" @click="changeState">
        <!-- 动态组件 -->
        <component :is="isCollapse ? Expand : Fold" />
      </el-icon>
      <ul>
        <li v-for="(item, index) in tab" :key="item.path">
          <el-icon size="15"><component :is="item.icon" /></el-icon>
          <!-- 使用 router-link 进行导航，to 属性绑定 item.path  -->
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
          <el-icon size="15" @click="closeTab(item, index)"><Close /></el-icon>
        </li>
      </ul>
    </div>
    <el-dropdown @command="handleClick">
      <div class="el-dropdown-link">
        <el-avatar :src="userInfo.avatar" />
        <p class="username">{{ userInfo.phoneNumber }}</p>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background: linear-gradient(145deg, #1a2f3b, #2a4e5c);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    // 左侧图标区域
    .icon {
      color: #58b2dc;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      height: 100%;
      &:hover {
        transform: scale(1.1);
        opacity: 0.9;
      }
    }
    ul {
      display: flex;
      gap: 6px; // 现代间距方案[3](@ref)
      margin-left: 16px;
      height: 100%;
      align-items: center;
      li {
        height: 100%;
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.05); // 半透明背景[3,7](@ref)
        border: 1px solid rgba(88, 178, 220, 0.2); // 金属质感边框[4](@ref)
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        // 图标样式
        .el-icon:first-child {
          margin-right: 8px;
          margin-left: 2px;
          color: #6abfdd; // 图标主色[4](@ref)
          transition: inherit;
        }

        // 路由链接样式
        a {
          font-size: 15px;
          color: #c3e4f3; // 文字基础色
          text-decoration: none;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis; // 文字溢出处理[3](@ref)
          white-space: nowrap;
          transition: color 0.2s;

          &.router-link-exact-active {
            // 激活状态[3](@ref)
            color: #a6e1fa;
            font-weight: 500;
          }
        }

        // 关闭按钮
        .el-icon:last-child {
          margin-left: 5px;
          margin-right: 2px;
          padding: 2px;
          opacity: 0.6;
          border-radius: 50%;
          transition: all 0.2s;

          &:hover {
            background: rgba(255, 90, 90, 0.15); // 危险操作反馈色[7](@ref)
            color: #ff6b6b;
            transform: scale(1.1);
          }
        }

        // 悬停效果
        &:hover {
          background: rgba(88, 178, 220, 0.15); // 悬停背景[4](@ref)
          transform: translateY(-1px); // 三维空间位移[4](@ref)
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 微投影增强层次[3](@ref)
        }

        // 当前路由激活状态
        &:has(a.router-link-exact-active) {
          background: linear-gradient(145deg, #1a5a7a, #1a4860); // 渐变激活背景[4](@ref)
          border-color: rgba(88, 178, 220, 0.5); // 高亮边框
        }
      }
    }
  }

  // 右侧用户信息
  .el-dropdown-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba(88, 178, 220, 0.15);

      .username {
        color: #58b2dc;
      }
    }

    .username {
      margin-left: 12px;
      font-size: 15px;
      color: #eef4f8;
      letter-spacing: 0.5px;
      transition: color 0.3s;
    }

    .el-avatar {
      border: 2px solid rgba(88, 178, 220, 0.3);
    }
  }
}

// 下拉菜单样式
.el-dropdown-menu {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 10px 0;

  .el-dropdown-menu__item {
    color: #eef4f8;
    font-size: 16px;
    padding: 12px 24px;
    transition: all 0.3s;

    &:hover {
      background: rgba(88, 178, 220, 0.15);
      color: #58b2dc;
      transform: translateX(4px);
    }

    &.command-cancel {
      font-weight: 500;
      letter-spacing: 0.8px;
    }
  }
}
</style>
