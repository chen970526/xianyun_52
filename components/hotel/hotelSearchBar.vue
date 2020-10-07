<template>
  <div class="hotel-search-bar">
    <el-form ref="form" :inline="true">
      <el-form-item>
        <el-input placeholder="切换城市"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

};
</script>

<style>
</style>
