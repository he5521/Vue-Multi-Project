<template>
  <div id="loginWrap">
    <el-container style="height: 100%">
      <div class="loginImgWrap">
        <div class="loginImg">
          <ul class="stsList">
            <li class="active"><a href="./">分销系统</a></li>
            <li><a href="/page1.html">财务系统</a></li>
            <li><a href="/page2.html">资金系统</a></li>
          </ul>
        </div>
      </div>
      <div class="loginForm">
        <h1>
          <p class="logo"><img src="@/assets/light-theme/images/logo.png"/></p>
          <p>分销系统</p>
        </h1>
        <div class="panel">
          <h2>账号登录</h2>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input placeholder="用户名" size="large" type="text" v-model="ruleForm.username" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" size="large" type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="large" type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
          <p class="note">系统编译时间:2019-12-02 17:48:28</p>
          <p class="note">下次发布时间:2019-12-11</p>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        let params = {
          ...this.ruleForm
        }
        if (valid) {
          this.$store.dispatch('LoginByUsername', params).then(() => {
            this.$router.push({ path: '/home' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
