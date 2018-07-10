<template>
  <div class="slogan">
    <h1>{{this.title}}</h1>
    <el-select v-model="group" placeholder="请选择" class="select">
      <el-option
        v-for="item in getAngleList"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-input
      class="input"
      placeholder="请输入文案标题"
      v-model="slogantitle">
    </el-input>
    <el-input
      class="input"
      type="textarea"
      :rows="4"
      placeholder="请输入文案"
      v-model="slogan">
    </el-input>
    <el-button type="primary" @click="save()">保存</el-button>
  </div>
</template>
<script>
  export default {
    name: 'slogan',
    data () {
      return {
        title: '添加文案',
        group: '',
        slogan: '',
        slogantitle: ''
      }
    },
    computed: {
      getAngleList () {
        return this.$store.state.AngleList
      },
      getuser () {
        return this.$store.state.user
      }
    },
    mounted () {
      this.getconfig()
    },
    methods: {
      save () {
        if (this.group !== '' && this.slogan !== '') {
          let self = this
          let result = {}
          result.group = this.group
          result.title = this.slogantitle
          result.slogan = this.slogan
          result.user = this.getuser
          this.$http.post('/api/resources/slogansave', result).then((response) => {
            if (response.data.status === 0) {
              self.$message({
                message: response.data.message,
                type: 'success'
              })
            } else {
              self.$message.error(response.data.message)
            }
          })
        }
      }
    }
  }
</script>
<style>
  .slogan {
    width: 100%;
    height: 100%;
  }
  .select{
    margin-top:100px;
  }
  .input{
    width: 50%;
    display: block;
    margin: 30px auto;
  }
</style>
