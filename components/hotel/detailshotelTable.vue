<template>
  <div class="table">
    <el-table
      @row-click="jump"
      :row-style="{ cursor: 'pointer' }"
      :data="products"
      style="width: 100%"
    >
      <el-table-column prop="name" label="价格来源" width="400">
      </el-table-column>
      <el-table-column prop="bestType" label="底价房型" width="400">
      </el-table-column>
      <el-table-column prop="price" label="最低价格/每晚">
        <template slot-scope="scope">
          <div class="cell">
            <span class="height-light larger">￥{{ scope.row.price }}</span
            >起
            <span>
              <i class="el-icon-arrow-right height-light"></i>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['products'],
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    jump() {
      window.open('https://hotels.ctrip.com/hotel/694679.html');
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  .cell {
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    .larger {
      font-size: larger;
    }
    .height-light {
      color: #f90;
    }
  }
}
</style>
