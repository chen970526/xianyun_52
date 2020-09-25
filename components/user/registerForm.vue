<template>
  <div class="form">
    <el-form ref="ruleForm" :rules="rules" :model="user" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="user.username"
          clearable
          placeholder="用户名手机"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          type="text"
          v-model="user.captcha"
          clearable
          placeholder="验证码"
        ></el-input>
        <el-button
          @click="getcaptcha"
          :disabled="onoff"
          ref="btn"
          size="medium"
          style="width: 111px"
          >发送验证码</el-button
        >
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input
          type="text"
          v-model="user.nickname"
          clearable
          placeholder="昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="user.password"
          clearable
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="user.checkPass"
          clearable
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <nuxt-link class="form-text" to @click.native="junplogin"
          >去登陆</nuxt-link
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="registeruser"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onoff: false,
      user: {
        username: '',
        nickname: '',
        captcha: '000000',
        password: '',
        checkPass: ''
      },
      // checkPass: '',
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        },
        {
          pattern: /^1\d{10}$|[A-Z a-z]{5}/, message: '请输入正确手机号', trigger: 'blur'
        }],
        captcha: [{
          required: true, message: '请输入验证码', trigger: 'blur'
        }],
        nickname: [{
          required: true, message: '请输入昵称', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }],
        checkPass: [
          {
            validator: (rule, value, callback) => {
              console.log(value);
              console.log(rule);
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    registeruser() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/registeruser', {
            username: this.user.username,
            nickname: this.user.nickname,
            captcha: this.user.captcha,
            password: this.user.password
          }).then(res => {
            console.log(res);
            this.$store.commit('user/increment', res.data);
            this.$message.success('注册成功！');
            this.$router.push({ path: '/' });
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$message.warning('请检查输入内容');
        }
      });
    },
    junplogin() {
      this.$emit('junplogin', 0);
    },
    getcaptcha() {
      this.onoff = true;
      let times = 10;
      this.$refs.btn.$el.innerText = `${times}秒`;
      const timesId = setInterval(() => {
        if (times === 0) { clearInterval(timesId); this.onoff = false; this.$refs.btn.$el.innerText = '发送验证码'; } else {
          times--;
          this.$refs.btn.$el.innerText = `${times}秒`;
        }
      }, 1000);
      // setTimeout(() => {

      // });

      // if (this.user.username !== '') {
      //   // this.onoff = true;
      //   this.$store.dispatch('user/getcaptcha', { tel: this.user.username }).then(res => {
      //     console.log(res);
      //     this.$alert(`验证码为：${res.data.code}`, {
      //       dangerouslyUseHTMLString: true
      //     });
      //   }).catch(err => {
      //     console.log(err);
      //     this.$alert('发送超时', {
      //       dangerouslyUseHTMLString: true
      //     });
      //   });
      // } else {
      //   this.$message.error('请输入手机号');
      // }
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
  /deep/.el-form-item__content {
    display: flex;
  }
  /deep/.el-form-item:nth-child(2) {
    /deep/.el-input__inner {
      border-radius: 0;
    }
    /deep/.el-button.el-button--default {
      border-radius: 0;
      border-left: 0;
    }
  }
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  line-height: 1;
  float: right;
}

.submit {
  width: 100%;
}
</style>
