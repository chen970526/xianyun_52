<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" ref="users" :model="{ users }">
        <div
          class="member-info-item"
          v-for="(item, index) in users"
          :key="index"
        >
          <el-form-item
            label="乘机人类型"
            :prop="`users.${index}.username`"
            :rules="{
              required: true,
              message: '名字不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              placeholder="姓名"
              class="input-with-select"
              v-model="item.username"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            label="证件类型"
            :prop="`users.${index}.id`"
            :rules="[
              {
                required: true,
                message: '请输入身份证',
                trigger: 'blur',
              },
              { type: 'number', message: '请输入数字值' },
              {
                pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                message: '身份证格式错误',
              },
            ]"
          >
            <el-input
              placeholder="证件号码"
              class="input-with-select"
              v-model.number="item.id"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers"
        >添加乘机人</el-button
      >
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-checkbox-group v-model="insuranceList">
          <div
            class="insurance-item"
            v-for="(item, index) in selectdata.insurances"
            :key="index"
          >
            <el-checkbox :label="item.id" border>
              {{ item.type }}：￥{{ item.price }}/份×1 最高赔付{{
                item.compensation
              }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="80px" ref="linkman" :model="linkman">
          <el-form-item
            label="姓名"
            prop="contactName"
            :rules="[{ required: true, message: '请输入紧急联系人名字' }]"
          >
            <el-input v-model="linkman.contactName"></el-input>
          </el-form-item>

          <el-form-item
            label="手机"
            prop="contactPhone"
            :rules="[
              { required: true, message: '输入手机号' },
              {
                pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                message: '手机格式错误',
              },
            ]"
          >
            <el-input
              placeholder="请输入内容"
              v-model.number="linkman.contactPhone"
            >
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item
            label="验证码"
            prop="captcha"
            :rules="[{ required: true, message: '输入验证码' }]"
          >
            <el-input v-model="linkman.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit"
          >提交订单</el-button
        >
      </div>
    </div>
    <input type="hidden" name="" :value="calculate" />
  </div>
</template>

<script>
export default {
  props: {
    selectdata: {
      type: Object
    }
  },
  mounted() {
    // console.log(this.selectdata.insurances);
    // console.log(this.selectdata);
    // console.log(this.$store.state.orderForm.orderFormdata);
    if (this.$store.state.orderForm.orderFormdata.users) {
      this.initdata(this.$store.state.orderForm.orderFormdata);
      this.$store.commit('orderForm/setorderFormdata', {});
    }
  },
  data() {
    return {
      users: [{
        username: '',
        id: 440681199705266600
      }],
      insuranceList: [], // 保险数据
      linkman: {
        contactName: '', // 联系人名字
        contactPhone: '', // 手机
        captcha: '' // 手机验证码
      },

      invoice: false // 发票 默认为false
    };
  },
  computed: {
    // 计算价钱
    calculate() {
      let count = 0;
      let baoxian = 0;
      count = this.selectdata.seat_infos.org_settle_price * this.users.length + 50 * this.users.length;
      this.insuranceList.forEach(i => {
        this.selectdata.insurances.filter(item => {
          if (item.id === i) {
            baoxian += this.users.length * item.price;
          }
        });
      });
      // console.log(baoxian);
      // console.log(count);
      this.$store.commit('air/setPrice', count + baoxian);
      return count + baoxian;
    }
  },
  methods: {
    initdata(obj) {
      this.users = obj.users;
      this.insuranceList = obj.insuranceList;
      console.log(this.insuranceList);
      this.linkman.contactName = obj.contactName;
      this.linkman.contactPhone = obj.contactPhone;
      this.linkman.captcha = obj.captcha;
      this.invoice = obj.invoice;
    },
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: '',
        id: ''
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        method: 'post',
        url: '/captchas',
        data: { tel: this.linkman.contactPhone }
      }).then(res => {
        console.log(res);
        this.$confirm(`验证码是${res.data.code}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'success'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '复制成功!'
          // });
        });
      });
    },

    // 提交订单
    handleSubmit() {
      this.$refs.users.validate(valid => {
        if (valid) {
          this.$refs.linkman.validate(valid2 => {
            if (valid2) {
              // eslint-disable-next-line camelcase
              let { id, seat_xid } = this.$route.query;
              this.$store.commit('orderForm/setorderFormdata', {
                users: this.users,
                insuranceList: this.insuranceList,
                contactName: this.linkman.contactName,
                contactPhone: this.linkman.contactPhone,
                invoice: this.invoice,
                captcha: this.linkman.captcha
              });
              this.$axios({
                method: 'post',
                url: '/airorders',
                headers: { Authorization: 'bearer ' + this.$store.state.user.userstate.token },
                data: {
                  users: this.users,
                  insurances: this.insuranceList,
                  contactName: this.linkman.contactName,
                  contactPhone: this.linkman.contactPhone,
                  invoice: this.invoice,
                  seat_xid: seat_xid,
                  air: id,
                  captcha: this.linkman.captcha
                }
              }).then(res => {
                this.$store.commit('orderForm/setorderFormdata', {});
                console.log(res);
                this.$router.push({ path: 'pay', query: { id: res.data.data.id } });
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
