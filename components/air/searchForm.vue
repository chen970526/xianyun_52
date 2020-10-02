<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          @blur="setone('departCity')"
          v-model="searchdata.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          @blur="setone('destCity')"
          v-model="searchdata.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          @change="handleDate"
          :picker-options="pickerOptions"
          v-model="searchdata.departDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width: 100%"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      searchdata: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 目标城市
        destCode: '', // 目标城市代码
        departDate: '' // 日期
      },
      searchArr: [],
      // 禁用时间
      pickerOptions: {
        disabledDate(time) {
          // console.log(new Date(`${moment(Date.now()).format('YYYY-MM-DD')} 00:00:00`));
          // if (time.getHours()) { }
          return time.getTime() <= +new Date(`${moment(Date.now()).format('YYYY-MM-DD')} 00:00:00`) - 1;
        }
      }
    };
  },
  methods: {
    seatchApi(value, callback) {
      if (value.trim() !== '') {
        this.searchArr.length = 0;
        this.$store.dispatch('user/seatchdata', { name: value.trim() }).then(res => {
          res.data.data.forEach(i => {
            if (i.sort) {
              this.searchArr.push({ value: i.name, sort: i.sort });
            }
          });
          if (this.searchArr.length === 0) {
            this.searchArr.push({ value: '当前地区信息为空' });
            callback(this.searchArr);
          } else { callback(this.searchArr); }
        }).catch(err => {
          console.log(err);
          this.$message.error('请求失败，请重试');
        });
      }
    },
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert('往返机票服务还没开始', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      }
      this.currentTab = index;
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, callback) {
      this.seatchApi(value, callback);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      this.seatchApi(value, callback);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.searchdata.departCity = item.value;
      this.searchdata.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.searchdata.destCity = item.value;
      this.searchdata.destCode = item.sort;
    },
    // 收索框失焦时填入第一项
    setone(type) {
      if (this.searchdata[type] !== '') {
        setTimeout(() => {
          if (type === 'departCity') {
            if (this.searchArr.findIndex(i => {
              return i.value === this.searchdata[type];
            }) === -1) {
              if (this.searchArr[0].value === '当前地区信息为空') { this.searchdata.departCity = ''; } else {
                this.searchdata.departCity = this.searchArr[0].value;
                this.searchdata.departCode = this.searchArr[0].sort;
              }
            }
          } else {
            if (this.searchArr.findIndex(i => {
              return i.value === this.searchdata[type];
            }) === -1) {
              if (this.searchArr[0].value === '当前地区信息为空') { this.searchdata.destCity = ''; } else {
                this.searchdata.destCity = this.searchArr[0].value;
                this.searchdata.destCode = this.searchArr[0].sort;
              }
            }
          }
          console.log(this.searchArr);
          this.searchArr.length = 0;
        }, 100);
      }
    },
    // 确认选择日期时触发
    handleDate(value) {
      // console.log(moment(value).format('YYYY-MM-DD'));
      this.searchdata.departDate = moment(value).format('YYYY-MM-DD');
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // departCity: '', // 出发城市
      // departCode: '', // 出发城市代码
      // destCity: '', // 目标城市
      // destCode:
      const {
        departCity,
        departCode, destCity, destCode
      } = this.searchdata;
      this.searchdata.departCity = destCity;
      this.searchdata.departCode = destCode;
      this.searchdata.destCity = departCity;
      this.searchdata.destCode = departCode;
      this.$message.success('切换成功');
    },

    // 提交表单是触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.searchdata.departCity,
          message: '请输入出发城市'
        },
        destCity: {
          value: this.searchdata.destCity,
          message: '请输入到达城市'
        },
        departDate: {
          value: this.searchdata.departDate,
          message: '请输入出发时间'
        }
      };
      // const fige = true;
      const indexxx = Object.keys(rules).findIndex(i => {
        // eslint-disable-next-line no-const-assign
        return rules[i].value === '';
      });
      if (indexxx !== -1) {
        console.log(rules[Object.keys(rules)[indexxx]]);
        this.$message.warning(`${rules[Object.keys(rules)[indexxx]].message}`);
      } else {
        if (this.searchdata.departCity.indexOf('市') !== -1) {
          this.searchdata.departCity = this.searchdata.departCity.slice(0, this.searchdata.departCity.indexOf('市'));
        }
        if (this.searchdata.destCity.indexOf('市') !== -1) {
          this.searchdata.destCity = this.searchdata.destCity.slice(0, this.searchdata.destCity.indexOf('市'));
        }
        console.log(this.searchdata);
        this.$store.commit('air/setSearchHistory', this.searchdata);
        this.$router.push({ path: '/air/flights', query: this.searchdata });
      }
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
