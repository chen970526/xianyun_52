<template>
  <div class="info-row">
    <div class="map-view" width="600px" height="400px">
      <div class="map-box">
        <div
          id="container"
          class="amap-container"
          style="position: relative; background: rgb(252, 249, 242)"
        ></div>
      </div>
      <div class="poi-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="poi-list-ov">
              <ul>
                <li
                  class="item"
                  v-for="(item, index) in scenery"
                  :key="index"
                  @mouseenter="movecenten(index)"
                  @mouseleave="deltext(index)"
                >
                  <span class="name">{{ item.name }}</span>
                  <span class=""
                    >{{ (item.distance / 1000).toFixed(2) }}公里</span
                  >
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div class="poi-list-ov">
              <ul>
                <li
                  class="item"
                  v-for="(item, index) in scenery"
                  :key="index"
                  @mouseenter="movecenten(index)"
                  @mouseleave="deltext(index)"
                >
                  <span class="name">{{ item.name }}</span>
                  <span class=""
                    >{{ (item.distance / 1000).toFixed(2) }}公里</span
                  >
                </li>
              </ul>
            </div></el-tab-pane
          >
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      activeName: 'first',
      map: {},
      scenery: {},
      diantext: {} // 信息框
    };
  },
  mounted() {
    console.log(this.data.real_city);
    window.onLoad = this.newMap;
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    // 删除信息
    deltext(index) {
      this.diantext.close();
    },
    // 移动中心点
    movecenten(index) {
      // console.log(this.scenery[index].name);
      this.map.panTo([this.scenery[index].location.R, this.scenery[index].location.Q]);
      this.diantext = new window.AMap.InfoWindow({
        autoMove: true,
        isCustom: true, // 使用自定义窗体
        content: `<div style="display: flex;background-color: #fff;"><p style="padding: 10px 18px 10px 10px;">${this.scenery[index].name}</p><span style="display: block;">X</span></div>`
      });
      this.diantext.open(this.map, [this.scenery[index].location.R, this.scenery[index].location.Q]);
    },
    // 创建地图实例
    newMap() {
      this.map = new window.AMap.Map('container', {
        zoom: 15 // 级别
        // resizeEnable: true
      });
      this.moveMap('风景名胜');
    },
    // 改变地图中心点
    moveMap(type) {
      console.log(type);
      this.map.setCenter([this.data.location.longitude, this.data.location.latitude]);
      window.AMap.service(['AMap.PlaceSearch'], () => {
        // 构造地点查询类
        var placeSearch = new window.AMap.PlaceSearch({
          type: type, // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.data.real_city, // 兴趣点城市
          citylimit: true, // 是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        var cpoint = [this.data.location.longitude, this.data.location.latitude]; // 中心点坐标
        placeSearch.searchNearBy('', cpoint, 20000, (status, result) => {
          // console.log(status);
          console.log(result);

          this.scenery = result.poiList.pois;
          console.log(this.scenery);
        });
      });
    },
    handleClick(tab, event) {
      // console.log(event);
      console.log(tab.index);
      if (tab.index === '0') {
        this.moveMap('风景名胜');
      } else if (tab.index === '1') {
        this.moveMap('交通设施服务');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info-row {
  margin: 40px 0;
  .map-view {
    display: flex;
    flex: 1;
    height: 360px;
    .map-box {
      width: 65%;
      height: 100%;
      #container {
        width: 100%;
        height: 100%;
      }
    }
    .poi-list {
      flex: 1;
      background-color: #fff;
      padding-left: 20px;
      .poi-list-ov {
        height: 300px;
        overflow: auto;
        font-size: 14px;
        color: #666;
        .item {
          display: flex;
          margin: 0 20px 20px 10px;
          cursor: pointer;
          .name {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
