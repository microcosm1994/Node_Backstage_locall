import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    title: '',
    loginStatus: '',
    user: {},
    usersCount: 0,
    source: [],
    slogan: [],
    page: {},
    sourceCount: 0,
    sloganCount: 0,
    search: {
      label: '',
      text: ''
    },
    AngleList: [],
    terraceList: [],
    countryList: []
  },
  mutations: {
    // 搜索结果页标题
    setTitle (state, string) {
      state.title = string
    },
    // 登录状态
    setloginStatus (state, string) {
      state.loginStatus = string
    },
    // 用户
    setuser (state, obj) {
      state.user = obj
    },
    // 搜索
    search (state, obj) {
      state.search = obj
    },
    // 素材
    source (state, data) {
      state.source = data
    },
    // 文案
    slogan (state, data) {
      state.slogan = data
    },
    // 页数
    page (state, obj) {
      state.page = obj
    },
    // 用户数量
    usersCount (state, number) {
      state.usersCount = number
    },
    // 素材数量
    sourceCount (state, number) {
      state.sourceCount = number
    },
    // 文案数量
    sloganCount (state, number) {
      state.sloganCount = number
    },
    // 分类
    setAngleList (state, array) {
      state.AngleList = array
    },
    // 平台
    setterraceList (state, array) {
      state.terraceList = array
    },
    // 国家
    setcountryList (state, array) {
      state.countryList = array
    }
  }
})
