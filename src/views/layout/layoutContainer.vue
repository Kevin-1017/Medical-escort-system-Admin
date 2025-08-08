<script setup>
import Aside from '@/components/aside.vue'
import Header from '@/components/header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>

        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  .el-header {
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
}
</style>
