<template>
  <div class="form">
    <el-form ref="ruleForm" :rules="rules" :model="user" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input type="text" v-model="user.username" clearable placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="user.captcha" clearable placeholder="验证码"></el-input>
        <el-button>发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input type="text" v-model="user.nickname" clearable placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" clearable placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.checkPass" clearable placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <nuxt-link class="form-text" to @click.native="junplogin">去登陆</nuxt-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        captcha: '',
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
    junplogin() {
      this.$emit('junplogin', 0);
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
