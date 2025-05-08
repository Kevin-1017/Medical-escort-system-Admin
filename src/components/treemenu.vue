<script setup>
import { useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores'
const headerStore = useHeaderStore()
const router = useRouter() //获取router实例
const props = defineProps(['menuData', 'index'])

const changeRouter = (item) => {
  headerStore.addTab(item.meta) //添加tab数据
  router.push(item.meta.path)
}
</script>

<template>
  <template v-for="(item, index) in menuData">
    <!-- 判断拿过来的目录中是否存在children属性；index作为唯一标识 -->
    <!-- 没有子菜单 -->
    <el-menu-item
      @click="changeRouter(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length === 0"
      :index="item.meta.path"
      :key="`${props.index}-${item.meta.id}`"
    >
      <el-icon size="20">
        <!-- 使用动态组件来渲染图标 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <!-- 有子菜单 -->
    <!-- 这里用:key="index + 1"不会影响key的唯一性，整个组件都是带嵌套的，只有这里是单个字符作为key-->
    <el-sub-menu v-else :index="item.meta.path" :key="index + 1">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 这里必须要用span包裹，要不然有bug -->
        <span>{{ item.meta.name }}</span>
      </template>

      <treemenu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
    </el-sub-menu>
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
