<template>
  <div class="login">
    <h1>{{title}}</h1>
    <div class="login-form">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" @keyup.enter.native="submitForm(loginForm)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" @keyup.enter.native="submitForm(loginForm)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)">登 录</el-button>
          <el-button @click="resetForm('loginForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :style="fixStyle" class="filter"></div>
    <video autoplay="autoplay"
    loop="loop"
    :style="this.fixStyle"
    >
      <source src="../../static/media/night.mp4" type="video/mp4"/>
      浏览器不支持 video 标签，建议升级浏览器。
      <source src="PATH_TO_WEBM" type="video/webm"/>
      浏览器不支持 video 标签，建议升级浏览器。
    </video>
    <div class="poster hidden" v-if="!vedioCanPlay">
      <img :style="fixStyle" src="../../static/img/video_cover.jpeg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        title: 'Welcome to Eago',
        loginForm: {
          account: '',
          password: ''
        },
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ]
        },
        vedioCanPlay: false,
        fixStyle: ''
      }
    },
    mounted () {
      this.remind()
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    },
    methods: {
      canplay () {
        this.vedioCanPlay = true
      },
      submitForm (form) {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let user = {}
            user.username = form.account
            user.password = form.password
            this.$http({
              method: 'post',
              url: '/api/account/login',
              data: user
            }).then((response) => {
              let data = response.data
              if (data.status === 0) {
                let user = {}
                user.nickname = data.data.nickname
                user.username = data.data.username
                user.portrait = data.data.portrait
                user.isAdmin = data.data.isAdmin
                this.$store.commit('setuser', user)
                this.$store.commit('setloginStatus', '退出')
                this.$cookies.set('_name', data.data.username, {
                  domain: 'sex.eago.world',
                  path: '/'
                })
                this.$message({
                  message: data.message,
                  type: 'success'
                })
                this.$router.push({path: '/home'})
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      login () {

      },
      remind: function () {
        let id = this.$cookies.get('_id')
        if (id) {
          this.$message({
            message: '检测到您已登陆',
            type: 'success'
          })
          this.$router.push({path: './home'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  /**{*/
    /*margin: 0;*/
    /*padding: 0;*/
  /*}*/
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  video{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    padding: 0;
    margin: 0;
  }
  h1 {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 58px;
    position: fixed;
    top:20%;
    left:50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 999;
  }
  .login-form{
    width: 340px;
    padding: 50px 34px 10px 14px;
    background: rgba(0,0,0,0.4);
    border-radius:5px;
    position: fixed;
    top:50%;
    left:50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 999;
  }
  .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
  }
</style>
