<script setup>
import treemenu from './treemenu.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useHeaderStore } from '@/stores'
import { storeToRefs } from 'pinia'

const headerStore = useHeaderStore()
//获取当前路由信息
const route = useRoute()
const activePath = ref(route.path)
// 监听路由变化，动态更新 activePath
watch(
  () => route.path,
  (newPath) => {
    activePath.value = newPath
  },
)
//正确解构响应式状态,storeToRefs 会保持响应性，将 state 转换为 isCollapse 的 ref 对象
const { state: isCollapse } = storeToRefs(headerStore)

//获取router实例
const router = useRouter()
//拿到 / 目录数据
const menuData = ref(router.options.routes[1].children)
</script>

<template>
  <div class="menu-container" :class="{ 'is-collapsed': isCollapse }">
    <!-- :collapse-transition="false" 禁用Element内置动画 -->
    <el-menu
      active-text-color="#58b2dc"
      background-color="#1a2f3b"
      text-color="#c3d7e5"
      :default-active="activePath"
      :collapse="isCollapse"
      :collapse-transition="false"
      class="custom-menu"
      :class="{ 'is-collapsed': isCollapse }"
    >
      <div class="projectName">
        <span>{{ isCollapse ? '' : '智护云陪诊' }}</span>
      </div>
      <!-- 发送 / 目录数据到子组件 -->
      <treemenu :menuData="menuData" :index="'1'"> </treemenu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  overflow: hidden;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 200px;

  &.is-collapsed {
    width: 70px;
  }
}
.custom-menu {
  height: 100vh;
  background: linear-gradient(145deg, #1a2f3b, #2a4e5c);
  border-right: none;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  .projectName {
    padding: 0 20px;
    height: 64px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 15px;
    transition: padding 0.3s; /* 添加过渡效果 */

    &::before {
      content: '';
      width: 6px;
      height: 24px;
      background: #2a84c6;
      margin-right: 12px;
      border-radius: 3px;
      transition: margin 0.3s; /* 过渡效果 */
    }

    span {
      font-size: 20px;
      font-weight: 500;
      color: #eef4f8;
      letter-spacing: 1px;
      white-space: nowrap; /* 防止文字换行 */
      overflow: hidden; /* 隐藏溢出内容 */
      text-overflow: ellipsis; /* 显示省略号 */
      transition: font-size 0.3s;
      flex-grow: 1; /* 撑满剩余空间 */
    }

    /* 折叠状态下的样式调整 */
    .el-menu.is-collapsed & {
      padding: 0 8px;

      &::before {
        margin-right: 6px; /* 缩小装饰条间距 */
      }
    }
  }
}
</style>
