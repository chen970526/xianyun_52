<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程： {{ flightsData.info ? flightsData.info.departCity : '' }} -
        {{ flightsData.info ? flightsData.info.destCity : '' }} /
        {{ flightsData.info ? flightsData.info.departDate : '' }}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="handledata"
        >
          <el-option
            :label="v"
            :value="v"
            v-for="(v, i) in flightsData.options
              ? flightsData.options.airport
              : []"
            :key="i"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="handledata"
        >
          <el-option
            :label="`${v.from < 10 ? '0' + v.from : v.from}:00 - ${
              v.to < 10 ? '0' + v.to : v.to
            }:00`"
            :value="`${v.from},${v.to}`"
            v-for="(v, i) in flightsData.options
              ? flightsData.options.flightTimes
              : []"
            :key="i"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="handledata"
        >
          <el-option
            :label="v"
            :value="v"
            v-for="(v, i) in flightsData.options
              ? flightsData.options.company
              : []"
            :key="i"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="handledata"
        >
          <el-option
            :label="v.name"
            :value="v.value"
            v-for="(v, i) in airListSize"
            :key="i"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flightsData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      airListSize: [{ name: '大', value: 'L' }, { name: '中', value: 'M' }, { name: '小', value: 'S' }]
    };
  },
  computed: {
    params() {
      return Object.assign({
        info: {},
        options: {}
      }, this.flightsData);
    }
  },
  mounted() {
    console.log(this.flightsData);
  },
  methods: {
    // 处理联动的筛选数据
    handledata() {
      let arr = [];
      if (this.airport) {
        arr.push({ org_airport_name: this.airport });
      }
      if (this.flightTimes) {
        arr.push({ dep_time: [+this.flightTimes.split(',')[0], +this.flightTimes.split(',')[1]] });
      }
      if (this.company) {
        arr.push({ airline_name: this.company });
      }
      if (this.airSize) {
        arr.push({ plane_size: this.airSize });
      }
      this.$emit('handledata', arr);
    },

    // 选择机场时候触发
    handleAirport(value) {

    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {

    },

    // 选择航空公司时候触发
    handleCompany(value) {

    },

    // 选择机型时候触发
    handleAirSize(value) {
      console.log(value);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ''; // 机场
      this.flightTimes = ''; // 出发时间
      this.company = ''; // 航空公司
      this.airSize = '';
      this.$message.success('重置成功');
      this.$emit('initdata');
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
