<template>
  <div class="form">
    <el-form ref="ruleForm" :rules="rules" :model="user" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input
          type="text"
          clearable
          v-model="user.username"
          placeholder="请输入用户名"
          @focus="cancelmsg('username')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          clearable
          v-model="user.password"
          placeholder="请输入密码"
          @focus="cancelmsg('password')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <nuxt-link class="form-text" to @click.native="junpregister">去注册</nuxt-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="submit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '13800138000',
        password: '123456'
      },
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        },
        {
          pattern: /^1\d{10}$|[A-Z a-z]{5}/, message: '请输入正确手机号', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    junpregister() {
      this.$emit('junpregister', 1);
    },
    cancelmsg(msgname) {
      this.$refs.ruleForm.clearValidate(msgname);
    },
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // try {
          //   const res = await this.$axios({
          //     method: 'post',
          //     url: '/accounts/login',
          //     data: this.user
          //   });
          //   console.log(res);
          //   this.$message.success('登陆成功!!!');
          //   this.$store.commit('user/increment', res.data);
          //   this.$router.push({ path: '/' });
          // } catch (err) {
          //   this.$message.error('登陆失败!请检查用户名或密码');
          // }
          this.$store.dispatch('user/loginActions', this.user).then(res => {
            console.log(res);
            this.$message.success('登陆成功!!!');
            this.$router.push({ path: '/' });
          }).catch(err => {
            console.log(err);
            this.$message.error('登陆失败!请检查用户名或密码');
          });
        } else {
          this.$message.error('请输入内容');
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
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
