<template>
  <div class="list-filter">
    <el-row type="flex" style="margin-left: -20px; margin-right: -20px">
      <el-col
        class="filter-col"
        :span="6"
        style="padding-left: 20px; padding-right: 20px"
      >
        <el-row class="filter-title" type="flex">
          <el-col :span="24">价格</el-col>
          <el-col :span="24" style="text-align: right">0-4000</el-col>
        </el-row>
        <el-row>
          <el-slider v-model="jiage" :max="4000" :step="10"></el-slider>
        </el-row>
      </el-col>
      <el-col
        class="filter-col"
        :span="5"
        style="padding-left: 20px; padding-right: 20px"
      >
        <el-row class="filter-title" type="flex">
          <el-col :span="24">住宿等级</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown class="filter-dropdown" trigger="click">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">一星</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">二星</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown></el-row
        >
      </el-col>
      <el-col
        class="filter-col"
        :span="5"
        style="padding-left: 20px; padding-right: 20px"
      >
        <el-row class="filter-title" type="flex">
          <el-col :span="24">住宿类型</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown class="filter-dropdown" trigger="click">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">一星</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">二星</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown></el-row
        ></el-col
      >
      <el-col
        class="filter-col"
        :span="5"
        style="padding-left: 20px; padding-right: 20px"
      >
        <el-row class="filter-title" type="flex">
          <el-col :span="24">酒店设施</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown class="filter-dropdown" trigger="click">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">一星</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">二星</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown></el-row
        ></el-col
      >
      <el-col
        class="filter-col"
        :span="5"
        style="padding-left: 20px; padding-right: 20px"
      >
        <el-row class="filter-title" type="flex">
          <el-col :span="24">酒店品牌</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown class="filter-dropdown" trigger="click">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">不限</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">一星</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconcircle"></i>
                  <span class="dropdown-menu-text">二星</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown></el-row
        ></el-col
      >
      <el-col
        class="filter-col"
        :span="4"
        style="padding-left: 20px; padding-right: 20px;border: none;"
      >
        <el-row type="flex" justify="center" align="middle" style="height: 100%"
          ><el-button type="primary">主要按钮</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jiage: 4000
    };
  }
};
</script>

<style lang="less" scoped>
.filter-view-menu-box {
  max-height: 230px;
  overflow: auto;
  .dropdown-menu-text {
    display: inline-block;
    min-width: 100px;
    margin-left: 10px;
  }
}
.list-filter {
  border: 1px solid #ddd;
  padding: 5px 20px;
  color: #666;
  .filter-col {
    border-right: 1px solid #ddd;
    padding: 5px 0;
    .filter-title {
      font-size: 14px;
    }
    .filter-wrapper {
      height: 38px;
      display: flex;
      align-items: center;
      .filter-dropdown {
        position: relative;
        width: 100%;
        .el-dropdown-link {
          display: flex;
          flex: 1;
          width: 100%;
          cursor: pointer;
        }
        .el-dropdown-text {
          flex: 1;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
