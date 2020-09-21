<template>
  <div class="index">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in coverList" :key="item.url">
        <h3 class="small">
          <img :src="item.url" alt />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { coverList } from '../assets/api';
export default {
  data() {
    return {
      coverList: []
    };
  },
  async mounted() {
    // this.$axios({
    //   url: '/scenics/banners',
    //   method: 'get'
    // }).then((res) => {
    //   console.log(res);
    //   this.coverList = res.data.data.map(item => {
    //     item.url = this.$axios.defaults.baseURL + item.url;
    //     return item;
    //   });
    //   console.log(this.coverList);
    // }).catch(err => {
    //   console.log(err);
    // });
    const res = await coverList();
    // console.dir(res);
    this.coverList = res.data.data.map(item => {
      item.url = this.$axios.defaults.baseURL + item.url;
      return item;
    });
    // console.dir(this.$axios.defaults.baseURL);
    // console.log(123);
  }
};
</script>

<style lang='less'>
// img{
//   width: 100%;
// }
// /deep/.el-carousel__container{
//   height: 674px;
// }
</style>
