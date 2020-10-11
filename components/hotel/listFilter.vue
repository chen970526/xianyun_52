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
          <el-col :span="24" style="text-align: right">0-{{ price }}</el-col>
        </el-row>
        <el-row>
          <el-slider
            v-model="price"
            :max="4000"
            :step="10"
            @change="handleCommandprice"
          ></el-slider>
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
          <el-dropdown
            class="filter-dropdown"
            trigger="click"
            @command="handleCommandLevels"
          >
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{
                CommandLevels.length === 0
                  ? '不限'
                  : CommandLevels.length === 1
                  ? CommandLevels[0][0]
                  : `已选${CommandLevels.length}项`
              }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="(item, index) in optionsdata.levels"
                  :key="index"
                  :command="item.id"
                >
                  <i
                    class="iconfont"
                    :class="{
                      'iconright-1': Levels.indexOf(item.id) !== -1,
                      iconcircle: Levels.indexOf(item.id) === -1,
                    }"
                  ></i>
                  <span class="dropdown-menu-text">{{ item.name }}</span>
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
          <el-dropdown
            class="filter-dropdown"
            @command="handleCommandTypes"
            trigger="click"
          >
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{
                CommandTypes.length === 0
                  ? '不限'
                  : CommandTypes.length === 1
                  ? CommandTypes[0][0]
                  : `已选${CommandTypes.length}项`
              }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="(item, index) in optionsdata.types"
                  :key="index"
                  :command="item.id"
                >
                  <i
                    class="iconfont"
                    :class="{
                      'iconright-1': Types.indexOf(item.id) !== -1,
                      iconcircle: Types.indexOf(item.id) === -1,
                    }"
                  ></i>
                  <span class="dropdown-menu-text">{{ item.name }}</span>
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
          <el-dropdown
            class="filter-dropdown"
            @command="handleCommandAssets"
            trigger="click"
          >
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{
                CommandAssets.length === 0
                  ? '不限'
                  : CommandAssets.length === 1
                  ? CommandAssets[0][0]
                  : `已选${CommandAssets.length}项`
              }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="(item, index) in optionsdata.assets"
                  :key="index"
                  :command="item.id"
                >
                  <i
                    class="iconfont"
                    :class="{
                      'iconright-1': Assets.indexOf(item.id) !== -1,
                      iconcircle: Assets.indexOf(item.id) === -1,
                    }"
                  ></i>
                  <span class="dropdown-menu-text">{{ item.name }}</span>
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
          <el-dropdown
            class="filter-dropdown"
            @command="handleCommandBrands"
            trigger="click"
          >
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{
                CommandBrands.length === 0
                  ? '不限'
                  : CommandBrands.length === 1
                  ? CommandBrands[0][0]
                  : `已选${CommandBrands.length}项`
              }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="(item, index) in optionsdata.brands"
                  :key="index"
                  :command="item.id"
                >
                  <i
                    class="iconfont"
                    :class="{
                      'iconright-1': Brands.indexOf(item.id) !== -1,
                      iconcircle: Brands.indexOf(item.id) === -1,
                    }"
                  ></i>
                  <span class="dropdown-menu-text">{{ item.name }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown></el-row
        ></el-col
      >
      <el-col
        class="filter-col"
        :span="4"
        style="padding-left: 20px; padding-right: 20px; border: none"
      >
        <el-row type="flex" justify="center" align="middle" style="height: 100%"
          ><el-button type="primary" @click="initfilter">撤销条件</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['optionsdata'],
  data() {
    return {
      price: 4000,
      Levels: [],
      Types: [],
      Assets: [],
      Brands: [],
      CommandLevels: [],
      CommandTypes: [],
      CommandAssets: [],
      CommandBrands: []

    };
  },
  mounted() {
    // concat
    console.log(this.optionsdata);
  },
  methods: {
    // 处理滑块
    handleCommandprice() {
      console.log(this.price);
      this.$emit('sendfilterdata', { price_lt: this.price });
    },
    // 清空筛选
    initfilter() {
      // window.location.href = '/hotel';
      this.$router.go(0);
    },
    handleCommandLevels(v) {
      // CommandLevels
      // console.log(this.optionsdata);
      this.CommandLevels = this.handlefilterdata(this.Levels, this.CommandLevels, 'levels', v);
      // console.log(this.Levels);
      // console.log(this.CommandLevels);
      this.$emit('sendfilterdata', { hotellevel: this.Levels });
    },
    handleCommandTypes(v) {
      // CommandTypes
      // console.log(this.optionsdata);
      this.CommandTypes = this.handlefilterdata(this.Types, this.CommandTypes, 'types', v);
      // console.log(this.Types);
      // console.log(this.CommandTypes);
      this.$emit('sendfilterdata', { hoteltype: this.Types });
    },
    handleCommandAssets(v) {
      // CommandAssets
      this.CommandAssets = this.handlefilterdata(this.Assets, this.CommandAssets, 'assets', v);
      // console.log(this.Assets);
      // console.log(this.CommandAssets);
      this.$emit('sendfilterdata', { hotelasset: this.Assets });
    },
    handleCommandBrands(v) {
      // ommandBrands
      this.CommandBrands = this.handlefilterdata(this.Brands, this.CommandBrands, 'brands', v);
      // console.log(this.Brands);
      // console.log(this.CommandBrands);
      this.$emit('sendfilterdata', { hotelbrand: this.Brands });
    },
    handlefilterdata(arrdata, arrdatalist, str, v) {
      if (arrdata.indexOf(v) !== -1) {
        const index = arrdata.indexOf(v);
        arrdata.splice(index, 1);
        arrdatalist.splice(index, 1);
        // console.log(arrdatalist);
        return arrdatalist;
      }
      let arr = [];
      arrdata.push(v);
      arrdata.forEach((value, i) => {
        arr.push(this.optionsdata[str].filter((item, index) => {
          if (item.id === value) {
            return item;
          }
        }).map(item => {
          return item.name;
        }));
      });
      return arr;
    }
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
