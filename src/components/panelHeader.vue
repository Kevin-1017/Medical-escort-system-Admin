<script setup>
// const props = defineProps({
//   info: {
//     type: Object,
//   },
// })
</script>
<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <!-- <div class="title">{{ props.info.meta.name }}</div>
      <p class="description">{{ props.info.meta.describe }}</p> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.panel-heading {
  padding: 15px;
  background: #e8edf0;
  border-color: #e8edf0;
  position: relative;
  .panel-lead {
    font-size: 14px;
    .title {
      font-weight: bold;
      font-style: normal;
    }
    .description {
      margin-top: 5px;
    }
  }
}
</style>
