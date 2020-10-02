<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm v-if="selectdata.insurances" :selectdata="selectdata" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside v-if="selectdata.insurances" :data="selectdata" />
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectdata: {}
    };
  },
  mounted() {
    // console.log(this.$route.query);
    // eslint-disable-next-line camelcase
    let { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${id}`,
      params: { seat_xid }
    }).then(res => {
      this.selectdata = res.data;
      // console.log(this.selectdata);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
