<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <el-row class="flight-title">
            <el-col :span="5"> 航空信息 </el-col>
            <el-col :span="14">
              <el-row type="flex" justify="space-between">
                <el-col :span="12"> 起飞时间 </el-col>
                <el-col :span="12"> 到达时间 </el-col>
              </el-row>
            </el-col>
            <el-col :span="5"> 价格 </el-col>
          </el-row>
        </div>

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item, index) in handleList"
          :key="index"
          :data="item"
        />
        <!-- 分页插件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightslist.length"
        >
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>

// import moment from 'moment';

export default {
  data() {
    return {
      flightslist: [], // 保留的总数据
      handleList: [],
      pageSize: 5,
      pageIndex: 1
    };
  },
  methods: {
    init() {
      this.handleList = this.flightslist.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex - 1) * this.pageSize + this.pageSize);
      console.log(this.handleList);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init();
    }
  },
  mounted() {
    // console.log(this.$route.query);
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightslist = res.data.flights;
      this.init();
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
  .flight-title {
    padding: 0 15px;
    border: 1px #ddd solid;
    background: #f6f6f6;
    height: 38px;
    line-height: 38px;
    color: #666;
    font-size: 12px;
    margin-bottom: 10px;

    > div {
      text-align: center;
    }
  }
}

.aside {
  width: 240px;
}
</style>
