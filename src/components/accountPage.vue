<template>
  <div class="accountPage">
    <h1>{{this.title}}</h1>
    <el-table
      :data="accountList"
      style="width: 80%;margin: 0 auto;">
      <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date | datetostring}}</span>
      </template>
    </el-table-column>
      <el-table-column
        label="昵称"
        width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.nickname }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="账号"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">********</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否管理员">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isAdmin | capitalize }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="account-modal">
      <el-dialog
        title="编辑账号"
        :visible.sync="accountModal"
        width="30%"
        center>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="update(accountForm)">修 改</el-button>
    <el-button type="primary" @click="accountModal = false, resetForm('accountForm')">关 闭</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'accountPage',
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
        title: '账号管理',
        accountModal: false,
        accountList: [],
        accountForm: {
          nickname: '',
          username: '',
          password: '',
          isAdmin: '',
          _id: '',
          checkPass: ''
        },
        accountRules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (value) {
          return '管理员'
        } else {
          return '普通用户'
        }
      }
    },
    mounted () {
      this.getAccount()
    },
    methods: {
      getAccount: function () {
        this.$http.get('/api/account/getaccount').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.accountList = data.data
          }
        })
      },
      update: function (form) {
        if (this.$cookies.get('_name') === 'admin') {
          this.$http.post('/api/account/updateAccount', form).then((response) => {
            if (response.data.status === 0) {
              this.$message({
                message: '账号"' + response.data.data.username + '"已修改',
                type: 'success'
              })
            } else {
              this.$message({
                message: '账号"' + response.data.data.username + '"无法修改',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '你不是管理员，请联系管理员修改账号',
            type: 'error'
          })
        }
      },
      handleEdit (index, row) {
        this.accountForm.isAdmin = row.isAdmin
        this.accountForm.username = row.username
        this.accountForm.nickname = row.nickname
        this.accountForm._id = row._id
        this.accountModal = true
        console.log(index, row)
      },
      handleDelete (index, row) {
        if (row.username === 'admin') {
          this.$message({
            message: '不能删除管理员账号',
            type: 'error'
          })
          return false
        }
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delUser = {}
          delUser._id = row._id
          this.$http.post('/api/account/delAccount', delUser).then((response) => {
            if (response.data.status === 0) {
              this.$message({
                message: response.data.message,
                type: 'success'
              })
              this.accountList.splice(index, 1)
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
  .cell{
    text-align: center;
  }
</style>
