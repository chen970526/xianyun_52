<template>
  <div class="container">
    <DetailshotelBreadcrumb
      v-if="hoteldata.address"
      :breadcrumbdata="hoteldata"
    />
    <el-row class="name-info">
      <el-col :span="24">
        <el-row>
          <h4 class="hotel-cn-name">
            {{ hoteldata.name }}
            <span>
              <i
                class="iconfont iconhuangguan"
                v-for="(item, index) of hoteldata.hotellevel
                  ? hoteldata.hotellevel.level
                  : 0"
                :key="index"
              ></i>
            </span>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel-en-name">{{ hoteldata.alias }}</span>
        </el-row>
        <el-row>
          <i class="iconfont iconlocation"></i>{{ hoteldata.address }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="pic-info info-row">
      <el-row class="photo-view">
        <el-col class="main-pic" :span="16">
          <img
            src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
            alt="锦江之星(吴泾店)"
            height="360"
            width="640"
          />
        </el-col>
        <el-col class="list-pics" :span="8">
          <el-row
            class="list-item"
            style="margin-left: -10px; margin-right: -10px"
          >
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
              <a href="javascript:void(0)">
                <img
                  src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
                  width="160"
                  alt="锦江之星(吴泾店)"
                /> </a
            ></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <DetailshotelTable
      v-if="hoteldata.products"
      :products="hoteldata.products"
    />
    <DetailshotelMap v-if="hoteldata.products" :data="hoteldata" />
    <Detailshoteldata v-if="hoteldata.products" :data="hoteldata" />
    <DetailshotelComment v-if="hoteldata.products" :data="hoteldata" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoteldata: {}
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.$axios({
      url: `/hotels?id=${this.$route.params.id}`
    }).then(res => {
      // console.log(res);
      this.hoteldata = res.data.data[0];
      console.log(this.hoteldata);
    });
  }
};
</script>

<style lang="less" scoped>
.iconhuangguan {
  color: #f90;
}
.container {
  width: 1000px;
  margin: 0 auto;
  .list-pics img {
    margin-bottom: 10px;
  }
  .name-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    .hotel-cn-name {
      color: #333;
      font-weight: 400;
      font-size: x-large;
    }
    .hotel-en-name {
      margin-bottom: 0.5em;
    }
  }
}
</style>
