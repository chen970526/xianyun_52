<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <!-- v-if="flightsListData.info" -->
        <FlightsFilters
          :flightsData="flightsListData"
          @handledata="filtrateList"
          @initdata="initList"
        />

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
        <div class="none" v-if="handleList.length === 0">找不到相关数据</div>
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
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <SearchList/>
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
      pageIndex: 1,
      flightsListData: {},
      total: 0,
      screenData: null
    };
  },
  methods: {
    initList() {
      this.screenData = null;
      this.init();
    },
    init() {
      if (this.screenData) {
        // console.log(data, 'data');
        this.total = this.screenData.length;
        this.handleList = this.screenData.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex - 1) * this.pageSize + this.pageSize);
        // console.log(this.handleList);
      } else {
        // console.log(this.flightslist);
        this.total = this.flightslist.length;
        this.handleList = this.flightslist.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex - 1) * this.pageSize + this.pageSize);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init();
    },
    filtrateList(data) {
      console.log(data);
      let obj = [];
      data.forEach((item, index) => {
        for (let d in item) {
          if (index === 0) {
            obj = this.flightslist.filter(i => {
              if (d === 'dep_time') {
                if (
                  item[d][0] <= +i[d].split(':')[0] && item[d][1] > +i[d].split(':')[0]
                ) {
                  return i;
                }
              } else {
                return i[d] === item[d];
              }
            });
          } else {
            obj = obj.filter(i => {
              // return i[d] === item[d];
              if (d === 'dep_time') {
                if (
                  item[d][0] <= +i[d].split(':')[0] && item[d][1] > +i[d].split(':')[0]
                ) {
                  return i;
                }
              } else {
                return i[d] === item[d];
              }
            });
          }
        }
      });
      this.screenData = obj;
      this.pageIndex = 1;
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
      const { flights, ...props } = res.data;
      this.flightsListData = props;
      this.init();
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
  .none {
    width: 100%;
    line-height: 70px;
    text-align: center;
    background-color: #ccc;
  }
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
