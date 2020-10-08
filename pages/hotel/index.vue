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
            <el-col :span="24" :class="{ 'hidden-all': isshow }">
              <div class="scenics-box">
                <span
                  class="location-budget"
                  v-for="(item, index) in mapdata.data
                    ? mapdata.data[0].scenics
                    : []"
                  :key="index"
                  >{{ item.name }}</span
                >
              </div>
              <nuxt-link to @click.native="isshow = !isshow">
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
    <ListFilter
      v-if="options.assets"
      :optionsdata="options"
      @sendfilterdata="getfilterdata"
    />
    <HotelList
      v-if="hoteldata.data"
      @getindex="handleindex"
      :senddata="hoteldata"
    />
    <!-- 引入高德地图的js -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&plugin=AMap.Driving,AMap.Transfer,AMap.Walking,AMap.Autocomplete"
    ></script> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: [0, 0],
      diming: '',
      isshow: true,
      mapdata: {},
      options: {},
      city: '', // 城市id
      hoteldata: {}, // 酒店信息
      pageindex: 0,
      filterList: []
    };
  },
  mounted() {
    window.onLoad = this.initmap;
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&callback=onLoad';

    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
    console.log(this.$route);
    this.optionsdata();
    if (this.$route.query.cityName) {
      this.getmapdata();
    }
    // console.log(this.diming);
  },
  watch: {
    $route() {
      this.getmapdata();
    }
  },
  methods: {
    // 接收筛选数据
    getfilterdata(data) {
      // console.log(data);
      // data.fildIndex();
      let index = 0;
      for (let p in data) {
        console.log(p);
        index = this.filterList.findIndex((item, index) => {
          console.log(item);
          return item[p];
        });
      }
      console.log(index);
      if (index !== -1) {
        this.filterList.splice(index, 1);
      }
      this.filterList.push(data);
      console.log(this.filterList);
    },
    // 处理分页
    handleindex(data) {
      this.pageindex = (data - 1) * 10;
      console.log(this.pageindex);
      this.getHoteldata({
        city: this.city,
        _start: this.pageindex
      });
    },
    // 获取当前城市酒店
    getHoteldata(obj) {
      this.$axios({
        url: '/hotels',
        params: obj
      }).then(res => {
        console.log(res);
        this.hoteldata = res.data;
      });
    },
    // 获取筛选项
    optionsdata() {
      this.$axios({
        url: '/hotels/options'
      }).then(res => {
        this.options = res.data.data;
        console.log(this.options);
      });
    },
    // 获取当前城市
    getmapdata() {
      this.$axios({
        url: '/cities',
        params: { name: this.$route.query.cityName }
      }).then(res => {
        // console.log(res);
        this.city = res.data.data[0].id;
        this.mapdata = res.data;
        console.log(this.city);
        this.getHoteldata({ city: this.city });
      });
    },
    // 初始化地图
    initmap() {
      var map = new window.AMap.Map('container', {
        zoom: 10, // 级别
        resizeEnable: true
        // center: this.center // 中心点坐标
        // pitch: 75,
        // viewMode: '3D' // 使用3D视图
      });
      console.log(map);
      console.log(this.$route);
      if (!this.$route.query.cityName) {
        console.log('this.$route.query.cityName');
        this.initdata();
      }
    },
    initdata() {
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new window.AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new window.AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        });

        geolocation.getCurrentPosition();
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'complete', (data) => {
          // data是具体的定位信息
          console.log(data, '成功');
          console.log(this.diming);
          console.log(this.$route);
          this.center = [data.position.Q, data.position.R];
          this.diming = data.addressComponent.city;
          console.log(this.center);
          console.log(this.diming);
          this.$router.replace({ path: '/hotel', query: { cityName: this.diming } });
          // console.log(this.center);
        });
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'error', onError);

        function onError(data) {
          console.log(data, '错误');
          // 定位出错
        }
      });
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
      .hidden-all .scenics-box {
        max-height: 3em;
        overflow: hidden;
      }
      .scenics-box {
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
