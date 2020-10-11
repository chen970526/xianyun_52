<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">{{ breadcrumbdata.real_city }}酒店</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ breadcrumbdata.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['breadcrumbdata']
};
</script>

<style lang="less" scoped>
.Breadcrumb {
  overflow: hidden;
  padding: 20px 0;
}
</style>
