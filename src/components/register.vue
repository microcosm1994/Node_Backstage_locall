<template>
  <div class="register">
    <h1>{{title}}</h1>
    <div class="register-form">
      <el-alert
        title="管理员拥有本后台管理系统所有账号的管理权限，请谨慎操作！"
        center
        :closable="false"
        type="info">
      </el-alert>
      <el-alert
        title="因后台系统不对外开放，所以简化了一些不必要的操作流程。"
        center
        :closable="false"
        type="info">
      </el-alert>
      <el-alert
        title="用户名应尽量使用公司职员英文名为账号"
        center
        :closable="false"
        type="info">
      </el-alert>
      <el-form :model="accountForm" :rules="accountRules" ref="accountForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="accountForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="accountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="accountForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="accountForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register()">保存</el-button>
          <el-button @click="resetForm('accountForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="请输入管理员密码"
      :visible.sync="adminModal"
      width="20%"
      center>
      <el-form :model="Administrators">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="Administrators.password"  type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="testAdmin(accountForm)">生成账号</el-button>
        <el-button type="primary" @click="adminModal = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.accountForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        title: '生成账号',
        adminModal: false,
        Administrators: {
          username: 'admin',
          password: ''
        },
        accountForm: {
          nickname: '',
          username: '',
          password: '',
          portrait: 'http://eago.oss-cn-hongkong.aliyuncs.com/portrait/timg.jpg',
          isAdmin: false,
          checkPass: ''
        },
        accountRules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
          isAdmin: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        formLabelWidth: '0px'
      }
    },
    methods: {
      register () {
        this.$refs['accountForm'].validate((valid) => {
          if (valid) {
            if (this.$cookies.get('_name') === 'admin') {
              this.adminModal = true
            } else {
              this.$message.error('你不是管理员，无法生成账号，请联系管理员为你生成账号')
            }
          } else {
            this.$message.error('请填写表单后再点击保存')
          }
        })
      },
      testAdmin: function (form) {
        console.log(form)
        let userAdmin = {}
        userAdmin.username = this.Administrators.username
        userAdmin.password = this.Administrators.password
        let user = {}
        user.nickname = form.nickname
        user.username = form.username
        user.password = form.password
        user.portrait = form.portrait
        user.isAdmin = form.isAdmin
        this.$http({
          method: 'post',
          url: '/api/account/login',
          data: userAdmin
        }).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              message: '已验证你的身份为管理员',
              type: 'success'
            })
            this.$http.post('/api/account/register', user).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$message({
                  message: data.message,
                  type: 'success'
                })
                this.$confirm('账号已经成功加入数据库', '提示', {
                  confirmButtonText: '返回账号管理界面',
                  cancelButtonText: '继续生成账号',
                  type: 'success'
                }).then(() => {
                  this.$router.push({path: './accountPage'})
                }).catch(() => {
                  this.$router.go(0)
                })
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            this.$message({
              message: '管理员身份验证失败，不能进行账号注册',
              type: 'error'
            })
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register {
    padding-top: 50px;
    opacity: 0.7;
  }

  h1 {
    font-weight: 700;
    color: #0f88eb;
    font-size: 58px;
  }
  .register-form{
    width: 380px;
    margin: 0 auto;
  }
</style>
