<template>
  <div class="hotel-list">
    <el-row class="hotel-item" style="margin-left: -10px; margin-right: -10px">
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
        <span class="img-wrapper">
          <nuxt-link to="">
            <img
              width="320"
              height="210"
              src="https://p1.meituan.net/hotel/c48d045b9f5bf221c479f55c622c8782154904.jpg%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20"
              alt=""
            />
          </nuxt-link>
        </span>
      </el-col>
      <el-col :span="10" style="padding-left: 10px; padding-right: 10px">
        <h4 class="hotel-cn-name">
          <nuxt-link to="">锦江之星(吴泾店)</nuxt-link>
        </h4>
        <div class="hotel-en-name">
          <span>jin jiang zhi xing (shang hai min hang wu jing dian)</span>
          <span style="display: flex" title="3星级">
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
          <span>经济型</span>
        </div>
        <el-row type="flex" style="margin-left: -5px; margin-right: -5px">
          <el-col style="padding-left: 5px; padding-right: 5px" :span="10">
            <el-rate
              v-model="star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </el-col>
          <el-col style="padding-left: 5px; padding-right: 5px" :span="7">
            <span class="height-light">27</span> 条评价 </el-col
          ><el-col style="padding-left: 5px; padding-right: 5px" :span="7"
            ><span class="height-light">27</span> 篇游记
          </el-col>
        </el-row>
        <div class="hotel-summary-row"></div>
        <div class="location-row">
          <i class="iconfont iconlocation"></i>位于: 剑川路165号(近龙吴路)
        </div>
      </el-col>
      <el-col
        :span="6"
        class="price-col"
        style="padding-left: 10px; padding-right: 10px"
      >
        <el-table :show-header="false" :data="tableData" style="width: 100%">
          <el-table-column prop="name" width="100"> </el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">￥{{ scope.row.price }}起</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      star: 3.5,
      tableData: [{
        name: '携程',
        price: '186'
      }, {
        name: '艺龙',
        price: '186'
      }, {
        name: 'Hotels.com',
        price: '186'
      }]
    };
  }
};
</script>

<style lang='less' scoped>
.iconhuangguan {
  color: #f90;
}
.height-light {
  color: #f90;
}
.hotel-cn-name {
  font-weight: 400;
  font-size: x-large;
}
.hotel-en-name {
  color: #999;
  margin-bottom: 0.5em;
}
.hotel-item {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
  .price-col {
    margin-top: 20px;
  }
}
</style>
