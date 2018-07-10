<template>
  <div class="headers">
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <div class="logo">
      <span style="color:#fed189;">Ea</span>
      <span style="color:#00a0df;">go</span>
    </div>
    <!--<div class="headers-nav">-->
    <!--<a href="javascript:;">图片素材</a>-->
    <!--<a href="javascript:;">视频素材</a>-->
    <!--</div>-->
    <div class="search">
      <el-input placeholder="请输入查找内容" v-model="searchText" @keyup.enter.native="getsearch" class="input-with-select">
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getsearch"></el-button>
      </el-input>
    </div>
    <div class="person">
      <div class="person-photo">
        <img :src="getuser.portrait" alt="">
      </div>
      <div class="person-container">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{this.getuser.nickname | capitalize}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">个人信息</el-dropdown-item>
            <el-dropdown-item command="setings" v-if="this.getuser.isAdmin">表单配置</el-dropdown-item>
            <el-dropdown-item command="accountPage" v-if="this.getuser.isAdmin">管理账号</el-dropdown-item>
            <el-dropdown-item command="creatAccount" v-if="this.getuser.isAdmin">生成账号</el-dropdown-item>
            <el-dropdown-item command="out">{{this.loginStatus}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'headers',
    data () {
      return {
        searchText: '',
        options: [{
          value: 'sourceName',
          label: '名称'
        }, {
          value: 'country',
          label: '国家'
        }, {
          value: 'terrace',
          label: '平台'
        }, {
          value: 'slogan',
          label: '文案'
        }, {
          value: 'slogantitle',
          label: '文案标题'
        }],
        value: ''
      }
    },
    filters: {
      capitalize: function (value) {
        if (value) {
          return value
        } else {
          return '请登录'
        }
      }
    },
    mounted () {},
    computed: {
      loginStatus () {
        return this.$store.state.loginStatus
      },
      getuser () {
        return this.$store.state.user
      },
      getpage () {
        return this.$store.state.page
      }
    },
    methods: {
      getsearch: function () {
        this.$store.commit('search', {label: this.value, text: this.searchText})
        if (this.value === '') {
          this.$alert('请选择查找方式', '搜索提醒', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.searchText === '') {
          this.$alert('请输入查找内容', '搜索提醒', {
            confirmButtonText: '确定'
          })
          return false
        }
        let url = '/api/resources/find?'
        if (this.value === 'slogan' || this.value === 'slogantitle') {
          url = '/api/resources/sloganfind?'
        }
        this.$http.get(url + this.value + '=' + this.searchText + '&page=' + 1 + '&size=' + this.getpage.size).then((response) => {
          if (response.data.status === 0) {
            if (this.value === 'slogan' || this.value === 'slogantitle') {
              this.$store.commit('sloganCount', response.data.count)
              this.$store.commit('slogan', response.data.data)
              this.$router.push({path: './slogan_library'})
            } else {
              this.$store.commit('sourceCount', response.data.count)
              this.$store.commit('source', response.data.data)
              this.$router.push({path: './library'})
            }
            this.$store.commit('setTitle', '搜索结果')
            this.searchText = ''
          } else {
            this.$alert(response.data.message, '搜索结果提醒', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      handleCommand (command) {
        if (command === 'person') {
          this.$router.push({path: './personal'})
        }
        if (command === 'setings') {
          this.$router.push({path: './setings'})
        }
        if (command === 'accountPage') {
          this.$router.push({path: './accountPage'})
        }
        if (command === 'creatAccount') {
          this.$router.push({path: './register'})
        }
        if (command === 'out') {
          let id = this.$cookies.get('_id')
          if (id) {
            this.$http.get('/api/account/logout').then((response) => {
              if (response.data.status === 0) {
                this.$cookies.remove('_name', {
                  domain: 'www.frzik.com',
                  path: '/'
                })
                this.$store.commit('setloginStatus', '登陆')
                this.$store.commit('setuser', {})
              }
            })
          } else {
            this.$router.push({path: '/'})
          }
        }
      }
    }
  }
</script>
<style>
  /*@import "../../static/css/stars.css";*/
  * {
    padding: 0;
    margin: 0;
    text-decoration: none;
    box-sizing: border-box;
  }

  .headers {
    width: 100%;
    min-width: 1200px;
    height: 70px;
    background: #27282a;
    padding-left: 100px;
    padding-right: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
  }

  .logo {
    display: inline-block;
    vertical-align: middle;
    width: 150px;
    height: 50px;
    position: absolute;
    top: 10px;
    left: 15px;
  }

  .logo span {
    line-height: 50px;
    font-size: 34px;
    font-weight: 700;
  }

  /*.headers-nav{*/
  /*margin-left: 30px;*/
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  /*height: 70px;*/
  /*}*/
  /*.headers-nav a{*/
  /*display: inline-block;*/
  /*width: 100px;*/
  /*height: 70px;*/
  /*line-height: 70px;*/
  /*text-align: center;*/
  /*font-size: 18px;*/
  /*font-weight: 700;*/
  /*color:#fed189;*/
  /*}*/
  .search {
    display: inline-block;
    float: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  .search .el-input__inner {
    width: 90px;
  }

  .input-with-select > .el-input__inner {
    width: 200px !important;
  }

  .el-scrollbar {
    text-align: center;
  }

  .el-select-dropdown .popper__arrow {
    left: 90px !important;
  }

  .person {
    width: 200px;
    height: 70px;
    display: inline-block;
    vertical-align: middle;
    float: right;
  }

  .person .person-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
    display: inline-block;
    vertical-align: top;
    border-radius: 50%;
    overflow: hidden;
  }

  .person .person-photo img {
    width: 100%;
    height: 100%;
  }

  .person .person-container {
    width: 140px;
    height: 70px;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }

  .person .person-container .el-dropdown-link {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    font-size: 16px;
    color: #f5f5f5;
    cursor: pointer;
  }

  .el-dropdown-menu .popper__arrow {
    left: 34px !important;
  }

  .person .person-container .person-nav a {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    color: #000;
  }

  .person .person-container .person-nav a:hover {
    background: #e2e2e2;
  }
</style>
