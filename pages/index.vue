<template>
  <div class="container">
    <el-carousel height="600px">
      <el-carousel-item v-for="(item,index) in coverList" :key="index">
        <h3 class="small">
          <img :src="item.url" :alt="item.desc" />
        </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            class="index"
            :class="{active:disposeIndex===index}"
            v-for="(value,index) in tabList"
            :key="index"
            @click="disposeTab(index)"
          >
            <i>{{value.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="tabList[disposeIndex].desc" v-model="userkey" />
          <i class="el-icon-search" @click="searchjump"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverList: [],
      tabList: [
        { name: '攻略', desc: '请输入搜索的城市', url: '/post?city=' },
        { name: '酒店', desc: '请输入搜索酒店的城市', url: '/hotel?city=' },
        { name: '机票', desc: '请输入搜索机票的城市', url: '/air' }
      ],
      disposeIndex: 0,
      userkey: ''
    };
  },
  async mounted() {
    // let aa = (f => n => n > 1 ? f(f)(n - 1) + f(f)(n - 2) : n)(f => n => n > 1 ? f(f)(n - 1) + f(f)(n - 2) : n)(10);
    // console.log(aa);
    const coverListdata = await this.$axios({
      url: '/scenics/banners',
      method: 'get'
    });
    // console.log(coverListdata);
    this.coverList = coverListdata.data.data.map(item => {
      item.url = this.$axios.defaults.baseURL + item.url;
      return item;
    });
  },
  methods: {
    searchjump() {
      this.$router.push({ path: this.tabList[this.disposeIndex].url + this.userkey });
    },
    disposeTab(index) {
      this.disposeIndex = index;
      if (index === 2) {
        this.$router.push({ path: this.tabList[this.disposeIndex].url });
      }
    }
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
