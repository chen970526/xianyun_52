<template>
  <div class="info-row">
    <el-row class="assets-info">
      <el-col class="assets-info-hd" :span="4">基本信息</el-col>
      <el-col class="assets-info-hd" :span="20">
        <el-row
          type="flex"
          class="base-info"
          style="margin-left: -5px; margin-right: -5px"
        >
          <el-col :span="24" style="padding-left: 5px; padding-right: 5px"
            >入住时间: 14:00之后
          </el-col>
          <el-col :span="24" style="padding-left: 5px; padding-right: 5px"
            >离店时间: 12:00之前
          </el-col>
          <el-col :span="24" style="padding-left: 5px; padding-right: 5px"
            >{{ data.creation_time }} / {{ data.renovat_time }}
          </el-col>
          <el-col :span="24" style="padding-left: 5px; padding-right: 5px"
            >酒店规模: {{ data.roomCount }}间客房
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-hd" :span="4">主要设施</el-col>
      <el-col class="assets-info-hd" :span="20">
        <span
          type="info"
          class="assets-info-item"
          v-for="(item, index) in data.hotelassets"
          :key="index"
          >{{ item.name }}</span
        >
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-hd" :span="4">停车服务</el-col>
      <el-col class="assets-info-bd base-info" :span="20"
        >{{ data.parking ? data.parking : '-' }}
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-hd" :span="4">品牌信息</el-col>
      <el-col class="assets-info-bd base-info" :span="20">
        {{ data.hotelbrand ? data.hotelbrand.name : '-' }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data'],
  mounted() {
    console.log(this.data);
  },
  data() {
    return {

    };
  }
};
</script>
<style lang="less" scoped>
.info-row {
  margin: 40px 0;
  .assets-info {
    border-bottom: 1px solid #eee;
    .assets-info-item {
      border: 1px solid #eee;
      padding: 4px 10px;
      margin-right: 10px;
      border-radius: 4px;
      background-color: #eee;
      color: #666;
    }

    .assets-info-hd,
    .assets-info-bd {
      padding: 20px 10px;
      font-size: 14px;
      .base-info {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>
