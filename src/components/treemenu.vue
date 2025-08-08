<script setup>
import { useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores'
const headerStore = useHeaderStore()
const router = useRouter()
const props = defineProps(['menuData'])

const changeRouter = (item) => {
  headerStore.addTab(item)
  router.push(item.path)
}
</script>

<template>
  <template v-for="item in props.menuData">
    <!-- 判断拿过来的目录中是否存在children属性；index作为唯一标识 -->
    <!-- 没有子菜单 -->
    <template v-if="!item.children || item.children.length === 0">
      <el-menu-item @click="changeRouter(item)" :index="item.path" :key="item.id">
        <el-icon size="20">
          <!-- 使用动态组件来渲染图标 -->
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
    <!-- 有子菜单 -->
    <template v-else>
      <el-sub-menu :index="item.path" :key="item.id">
        <template #title>
          <el-icon size="20">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>

        <treemenu :menuData="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item,
.el-sub-menu__title {
  height: 48px;
  line-height: 48px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(88, 178, 220, 0.15);
    transform: translateX(4px);
  }

  i {
    font-size: 18px;
    margin-right: 8px;
  }
}

.el-menu-item.is-active {
  background: rgba(88, 178, 220, 0.15);
  color: #58b2dc;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 3px;
    background: #2a84c6;
  }
}
</style>
