<template>
  <div class="home">
    <headers></headers>
    <div class="home-container">
      <div class="home-sidebar">
        <ul>
          <li @click="setActive()">
            <a href="javascript:;"
               v-bind:class="{active:activeClass.eago}"
            >
              <router-link to="/home">Home</router-link>
            </a>
          </li>
          <li @click="setActive(), getAll()">
            <a href="javascript:;"
               v-bind:class="{active:activeClass.library}"
            >
              <router-link to="/library">素材库</router-link>
            </a>
          </li>
          <li @click="setActive(), getsloganAll()">
            <a href="javascript:;"
               v-bind:class="{active:activeClass.slogan_library}"
            >
              <router-link to="/slogan_library">文案库</router-link>
            </a>
          </li>
          <li @click="setActive()">
            <a href="javascript:;"
              v-bind:class="{active:activeClass.add}"
            >
              <router-link to="/add">添加素材</router-link>
            </a>
          </li>
          <li @click="setActive()">
            <a href="javascript:;"
               v-bind:class="{active:activeClass.slogan}"
            >
              <router-link to="/slogan">添加文案</router-link>
            </a>
          </li>
        </ul>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      </div>
      <div class="home-route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    components: {
      // 异步组件
      'headers': () => import('./head')
    },
    data () {
      return {
        title: 'home',
        activeClass: {
          eago: false,
          library: false,
          add: false,
          slogan: false,
          slogan_library: false
        }
      }
    },
    mounted () {
      this.setActive()
      this.loginkeep()
    },
    methods: {
      getAll: function () {
        this.$http.get('/api/resources/all').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('source', data.data)
            this.$store.commit('setTitle', '素材库')
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      getsloganAll: function () {
        this.$http.get('/api/resources/slogan_all').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('slogan', data.data)
            this.$store.commit('setTitle', '文案库')
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      setActive: function () {
        let address = this.$router.currentRoute.name
        for (let key in this.activeClass) {
          if (key === address) {
            this.activeClass[key] = true
          } else {
            this.activeClass[key] = false
          }
        }
      },
      loginkeep: function () {
        let id = this.$cookies.get('_id')
        if (id) {
          this.$http.get('/api/account/user?_id=' + id).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.$cookies.set('_name', data.data.username, {
                domain: 'localhost',
                path: '/'
              })
              this.$store.commit('setuser', data.data)
            } else {
              this.$message({
                message: '获取用户信息失败，请退出后重新登录',
                type: 'error'
              })
            }
          })
          this.$store.commit('setloginStatus', '退出')
        } else {
          this.$message({
            message: '检测到您没有登陆',
            type: 'info'
          })
          this.$store.commit('setloginStatus', '登陆')
          this.$router.push({path: '/'})
        }
      }
    }
  }
</script>
<style>
  /*@import "../../static/css/stars.css";*/
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body{
    height: 100%;
    background: #f5f5f5;
  }
  .home{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .home-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    padding-top: 70px;
  }
  .home-sidebar{
    width: 180px;
    height: 100%;
    position: fixed;
    left: 0;
    top:0px;
    background: #36373b;
    padding-top: 70px;
    overflow: hidden;
  }
  .home-sidebar ul{
    width: 100%;
    height: 100%;
    margin-top: 40px;
  }
  .home-sidebar ul li{
    width: 100%;
    height: 70px;
  }
  .home-sidebar ul li a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    color:#fff;
    font-size: 18px;
  }
  .home-sidebar ul li a:hover{
    background: #27282a;
  }
  .active{
    background: #27282a;
  }
  .home-route{
    width: 100%;
    padding-left: 180px;
  }
</style>
