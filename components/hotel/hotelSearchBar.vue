<template>
  <div class="hotel-search-bar">
    <el-form ref="form" :inline="true">
      <el-form-item>
        <!-- <el-input placeholder="切换城市" v-model="name"></el-input> -->
        <el-autocomplete
          @blur="setone('departCity')"
          v-model="searchdata.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="切换城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          v-model="date"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="senddata">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      // name: '',
      date: '',
      searchdata: {
        departCity: '' // 出发城市
      },
      searchArr: [], // 禁用时间
      pickerOptions: {
        disabledDate(time) {
          // console.log(new Date(`${moment(Date.now()).format('YYYY-MM-DD')} 00:00:00`));
          // if (time.getHours()) { }
          return time.getTime() <= +new Date(`${moment(Date.now()).format('YYYY-MM-DD')} 00:00:00`) - 1;
        }
      }
    };
  },
  watch: {
  },
  methods: {
    // 点击查看按钮
    senddata() {
      console.log(this.searchdata);
      console.log(this.date);
      this.$emit('senddate', { leftTime: this.date[1], enterTime: this.date[0] });
    },
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
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.searchdata.departCity = item.value;
      this.$emit('sendcityName', this.searchdata.departCity);
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, callback) {
      this.seatchApi(value, callback);
    },
    // 收索框失焦时填入第一项
    setone(type) {
      // if (this.searchdata[type] !== '') {
      //   setTimeout(() => {
      //     if (type === 'departCity') {
      //       if (this.searchArr.findIndex(i => {
      //         return i.value === this.searchdata[type];
      //       }) === -1) {
      //         if (this.searchArr[0].value === '当前地区信息为空') { this.searchdata.departCity = ''; } else {
      //           this.searchdata.departCity = this.searchArr[0].value;
      //         }
      //       }
      //     } else {
      //       if (this.searchArr.findIndex(i => {
      //         return i.value === this.searchdata[type];
      //       }) === -1) {
      //         if (this.searchArr[0].value === '当前地区信息为空') { this.searchdata.destCity = ''; } else {
      //           this.searchdata.destCity = this.searchArr[0].value;
      //           this.searchdata.destCode = this.searchArr[0].sort;
      //         }
      //       }
      //     }
      //     console.log(this.searchArr);
      //     this.searchArr.length = 0;
      //   }, 100);
      // }
    }
  }
};
</script>

<style>
</style>
