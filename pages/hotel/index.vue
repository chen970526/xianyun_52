<template>
  <div>
    <!-- 引入高德地图的js -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=060b272204760db332cb8437f96c0d31&plugin=AMap.Driving,AMap.Transfer,AMap.Walking,AMap.Autocomplete"
    ></script>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line no-undef
    var map = new AMap.Map('container', {
      zoom: 11, // 级别
      pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
      center: [113.4278180000, 23.1293300000], // 中心点坐标
      viewMode: '3D' // 使用3D视图
    });
    // eslint-disable-next-line no-undef
    var marker1 = new AMap.Marker({
      // eslint-disable-next-line no-undef
      position: new AMap.LngLat(113.4278180000, 23.1293300000), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '黑马程序员'
      // icon: 'https://fs-km.7moor.com/N00000021451/km/2018-08-30/1535629155660/52cdcfd0-ac49-11e8-b46c-47849b41fd55?imageView2/1/w/50/h/50'
    });
    map.add([marker1]);
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 500px;
}
</style>
