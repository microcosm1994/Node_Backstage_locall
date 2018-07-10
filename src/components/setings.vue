<template>
  <div class="seting">
    <h1>{{title}}</h1>
    <el-alert
      v-if="time !== ''"
      :title="time | dateslice"
      type="info">
    </el-alert>
    <div class="tag-box">
      <h4>平台</h4>
      <el-tag
        :key="tag"
        v-for="tag in terraceTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag,'terraceTags')">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible_terrace"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm('terrace')"
        @blur="handleInputConfirm('terrace')"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible_terrace')">+ New Tag</el-button>
    </div>
    <div class="tag-box">
      <h4>Angle</h4>
      <el-tag
        :key="tag"
        v-for="tag in AngleTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag,'AngleTags')">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible_Angle"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm('Angle')"
        @blur="handleInputConfirm('Angle')"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible_Angle')">+ New Tag</el-button>
    </div>
    <div class="tag-box">
      <h4>国家</h4>
      <el-tag
        :key="tag"
        v-for="tag in countryTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag,'countryTags')">
        {{tag | country_filters}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible_country"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm('country')"
        @blur="handleInputConfirm('country')"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible_country')">+ New Tag</el-button>
    </div>
    <el-button type="primary" @click="defaults">恢复默认配置</el-button>
    <el-button type="primary" @click="saveSeting">保存配置</el-button>
  </div>
</template>
<script>
  export default {
    name: 'setings',
    data () {
      return {
        title: '表单配置',
        time: '',
        AngleTags: [],
        terraceTags: [],
        countryTags: [],
        inputVisible: ['inputVisible_Angle', 'inputVisible_terrace', 'inputVisible_country'],
        inputVisible_Angle: false,
        inputVisible_terrace: false,
        inputVisible_country: false,
        inputValue: ''
      }
    },
    filters: {
      country_filters: function (value) {
        return value.slice(value.indexOf('-') + 1, value.indexOf('('))
      },
      dateslice: function (value) {
        if (value !== '') {
          return '最后保存时间为 ' + value.slice(0, value.indexOf('T'))
        }
      }
    },
    mounted () {
      this.getSeting()
    },
    methods: {
      getSeting: function () {
        this.$http.get('/api/seting/getconfig').then((response) => {
          if (response.data.status === 0) {
            this.AngleTags = response.data.data[0].AngleList
            this.terraceTags = response.data.data[0].terraceList
            this.countryTags = response.data.data[0].countryList
            this.time = response.data.data[0].date
          }
        })
      },
      saveSeting: function () {
        let data = {}
        data.terraceList = this.terraceTags
        data.AngleList = this.AngleTags
        data.countryList = this.countryTags
        this.$http.post('/api/seting/saveconfig', data).then((response) => {
          if (response.data.status === 0) {
            this.$store.commit('setAngleList', data.AngleList)
            this.$store.commit('setterraceList', data.terraceList)
            this.$store.commit('setcountryList', data.countryList)
            this.$message({
              message: response.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
      },
      defaults: function () {
        this.$http.get('/api/seting/defaults').then((response) => {
          if (response.data.status === 0) {
            this.getSeting()
          }
        })
      },
      handleClose (tag, key) {
        this[key].splice(this[key].indexOf(tag), 1)
      },

      showInput (key) {
        this[key] = true
        for (let i = 0; i < this.inputVisible.length; i++) {
          if (this.inputVisible[i] !== key) {
            this[this.inputVisible[i]] = false
          }
        }
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm (key) {
        let inputValue = this.inputValue
        if (inputValue) {
          if (key === 'terrace') {
            this.terraceTags.push(inputValue)
            this.inputVisible_terrace = false
          }
          if (key === 'Angle') {
            this.AngleTags.push(inputValue)
            this.inputVisible_Angle = false
          }
          if (key === 'country') {
            this.countryTags.push(inputValue)
            this.inputVisible_country = false
          }
        }
        this.inputValue = ''
      }
    }
  }
</script>
<style>
  .seting{
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .tag-box{
    width: 80%;
    margin: 50px auto;
    padding: 24px;
    border:1px solid #e2e2e2;
    box-shadow: 0 0px 15px #999999;
    border-radius: 10px;
    text-align: left;
  }
  h4{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-top: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
