<template>
  <div class="hotel-list" v-if="senddata.data.length > 0">
    <el-row
      class="hotel-item"
      style="margin-left: -10px; margin-right: -10px"
      v-for="(item, index) in senddata.data"
      :key="index"
    >
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
        <span class="img-wrapper">
          <nuxt-link to="">
            <img width="320" height="210" :src="item.photos" :alt="item.name" />
          </nuxt-link>
        </span>
      </el-col>
      <el-col :span="11" style="padding-left: 10px; padding-right: 10px">
        <h4 class="hotel-cn-name">
          <nuxt-link to="">{{ item.name }}</nuxt-link>
        </h4>
        <div class="hotel-en-name">
          <span>{{ item.alias }}</span>
          <span
            style="display: flex"
            :title="`${item.hotellevel ? item.hotellevel.name : ''}级`"
          >
            <i
              class="iconfont iconhuangguan"
              v-for="(v, i) of item.hotellevel ? item.hotellevel.level : 0"
              :key="i"
            ></i>
          </span>
          <span>{{ item.hoteltype.name }}</span>
        </div>
        <el-row type="flex" style="margin-left: -5px; margin-right: -5px">
          <el-col style="padding-left: 5px; padding-right: 5px" :span="10">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </el-col>
          <el-col style="padding-left: 5px; padding-right: 5px" :span="7">
            <span class="height-light">{{
              Math.floor(Math.random() * 100)
            }}</span>
            条评价 </el-col
          ><el-col style="padding-left: 5px; padding-right: 5px" :span="7"
            ><span class="height-light">{{
              Math.floor(Math.random() * 100)
            }}</span>
            篇游记
          </el-col>
        </el-row>
        <div class="hotel-summary-row"></div>
        <div class="location-row" style="margin-top: 10px">
          <i class="iconfont iconlocation"></i>{{ item.address }}
        </div>
      </el-col>
      <el-col :span="5" class="price-col">
        <el-table
          :show-header="false"
          :data="item.products"
          style="width: 100%"
        >
          <el-table-column prop="name" width="100"> </el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px"
                >￥<span class="height-light">{{ scope.row.price }}</span>
                起</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination-box">
      <el-pagination
        layout="prev, pager, next"
        :total="senddata.total"
        @current-change="handlepage"
      >
      </el-pagination>
    </div>
  </div>
  <div class="none" v-else>没有如何数据</div>
</template>

<script>
export default {
  props: ['senddata'],
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    // console.log(this.senddata);
  },
  methods: {
    // initdata(){
    //   this.
    // }
    handlepage(val) {
      this.$emit('getindex', val);
    }
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
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #999;
  margin-bottom: 0.5em;
}
.hotel-list {
  .pagination-box {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0 40px;
  }
}
.hotel-item {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
  .price-col {
    margin-top: 20px;
  }
}
</style>
