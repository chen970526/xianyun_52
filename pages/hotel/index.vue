<template>
  <div class="hotel">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <HotelSearchBar />
    <el-row
      type="flex"
      class="hotel-option-row"
      style="margin-left: -5px; margin-right: -5px"
    >
      <el-col :span="14">
        <el-row class="search-options">
          <el-row class="options-row" type="flex">
            <el-col :span="3">区域:</el-col>
            <el-col :span="24">
              <div class="scenics-box">
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
                <div class="location-budget">人民广场</div>
              </div>
              <nuxt-link to="#">
                <i class="el-icon-d-arrow-right"></i> 等29个区域</nuxt-link
              >
            </el-col>
          </el-row>
          <el-row class="option-row price-row" type="flex">
            <el-col :span="3">
              均价
              <el-tooltip
                effect="dark"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <sup class="question-mark">?</sup></el-tooltip
              >:
            </el-col>
            <el-col :span="24">
              <el-row type="flex">
                <el-col :span="6">
                  <el-tooltip
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">¥332</span>
                    </div>
                  </el-tooltip></el-col
                ><el-col :span="6">
                  <el-tooltip
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">¥521</span>
                    </div>
                  </el-tooltip></el-col
                ><el-col :span="6">
                  <el-tooltip
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">¥768</span>
                    </div>
                  </el-tooltip></el-col
                >
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="10"><div id="container"></div></el-col>
    </el-row>
    <ListFilter />
    <HotelList />
    <!-- 引入高德地图的js -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&plugin=AMap.Driving,AMap.Transfer,AMap.Walking,AMap.Autocomplete"
    ></script> -->
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = this.initmap;
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&callback=onLoad';

    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    // 初始化地图
    initmap() {
      var map = new window.AMap.Map('container', {
        zoom: 30, // 级别
        center: [113.427912, 23.129489], // 中心点坐标
        pitch: 75,
        viewMode: '3D' // 使用3D视图
      });
      console.log(map);

      // eslint-disable-next-line no-undef
      // var map = new AMap.Map('container', {
      //   zoom: 11, // 级别
      //   pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
      //   center: [113.4278180000, 23.1293300000], // 中心点坐标
      //   viewMode: '3D' // 使用3D视图
      // });
      // // eslint-disable-next-line no-undef
      // var marker1 = new AMap.Marker({
      //   // eslint-disable-next-line no-undef
      //   position: new AMap.LngLat(113.4278180000, 23.1293300000), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //   title: '黑马程序员'
      //   // icon: 'https://fs-km.7moor.com/N00000021451/km/2018-08-30/1535629155660/52cdcfd0-ac49-11e8-b46c-47849b41fd55?imageView2/1/w/50/h/50'
      // });
      // map.add([marker1]);
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
.hotel {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    overflow: hidden;
    padding: 20px 0;
  }
  .hotel-option-row {
    min-height: 260px;
    margin-bottom: 20px;
    .search-options {
      margin-bottom: 20px;
      color: #666;
      font-size: 14px;
      .scenics-box {
        max-height: 3em;
        overflow: hidden;
        .location-budget {
          margin-right: 1em;
          padding: 0 2px;
          border-radius: 4px;
          display: inline-block;
        }
      }
      .options-row {
        margin-bottom: 20px;
        color: #666;
        font-size: 14px;
        .el-icon-d-arrow-right {
          transform: rotate(270deg);
          color: #f90;
        }
        .hidden-all {
          .el-icon-d-arrow-right {
            transform: rotate(90deg);
          }
        }
      }
      .price-row {
        .el-tooltip.question-mark {
          display: none;
          background-color: #ccc;
          color: #fff;
          display: inline-block;
          width: 1.2em;
          height: 1.2em;
          text-align: center;
          border-radius: 100%;
        }
        .iconhuangguan {
          color: #f90;
        }
        .el-tooltip {
          display: flex;
        }
      }
    }
  }
}
</style>
