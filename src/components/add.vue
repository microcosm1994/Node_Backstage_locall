<template>
  <div class="add">
    <h1>{{title}}</h1>
    <div class="add-photo">
      <el-upload
        class="upload-demo"
        action="/api/picture/upload"
        name="img"
        :headers="headers"
        multiple
        drag
        list-type="picture"
        :on-success="uploadsuccess"
        :on-error="uploaderr"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="" v-if="this.type === 'image'">
        <video width="100%" :src="dialogImageUrl" alt="" v-if="this.type === 'video'" controls></video>
      </el-dialog>
    </div>
    <div class="add-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="素材名称" prop="sourceName">
          <el-input v-model="ruleForm.sourceName"></el-input>
        </el-form-item>
        <div class="three">
          <el-form-item label="素材分类" prop="Angle">
            <el-select v-model="ruleForm.Angle" placeholder="分类">
              <el-option
                v-for="item in getAngleList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="平台" prop="terrace">
            <el-select v-model="ruleForm.terrace" placeholder="平台">
              <el-option
                v-for="item in getterraceList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="Opeavtor" prop="opeavtor">
            <el-input :disabled="true" v-model="ruleForm.opeavtor = getuser.nickname"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="two">
          <el-form-item label="展示" prop="reveal">
            <el-input v-model.number="ruleForm.reveal"></el-input>
          </el-form-item>
        </div>
        <div class="two">
          <el-form-item label="点击数" prop="click">
            <el-input v-model.number="ruleForm.click"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="three">
          <el-form-item label="Conversion" prop="conversion">
            <el-input v-model.number="ruleForm.conversion"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="Spent" prop="Spent">
            <el-input v-model.number="ruleForm.Spent"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="Revenue" prop="Revenue">
            <el-input v-model.number="ruleForm.Revenue"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="three">
          <el-form-item label="CPM" prop="CPM">
            <el-input :disabled="true" v-model="getCPM"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="CTR" prop="CTR">
            <el-input :disabled="true" v-model="getCTR"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="CPC" prop="CPC">
            <el-input :disabled="true" v-model="getCPC"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="landingContainer" ref="landingContainer" v-if="this.ruleForm.landingPageList.length">
          <div class="el-form-item" v-for="(item, index) in this.ruleForm.landingPageList">
            <label class="el-form-item__label" style="width: 100px;">{{'LandingPage' + (index + 1)}}</label>
            <div class="el-form-item__content" style="margin-left: 100px;">
              <div class="content">
                <div class="el-input is-disabled" style="width: 36%;">
                  <input autocomplete="off" disabled="disabled" type="text" rows="2" validateevent="true" class="el-input__inner" :value="item.landingPageURL">
                </div>
                <div class="el-input is-disabled">
                  <input autocomplete="off" disabled="disabled" type="text" rows="2" validateevent="true" clearable="true" class="el-input__inner" :value="item.landingPageClick">
                </div>
                <div class="el-input is-disabled">
                  <input autocomplete="off" disabled="disabled" type="text" rows="2" validateevent="true" clearable="true" class="el-input__inner" :value="item.landingPageCR">
                </div>
                <div class="el-input is-disabled">
                  <input autocomplete="off" disabled="disabled" type="text" rows="2" validateevent="true" clearable="true" class="el-input__inner" :value="item.landingPageCVR">
                </div>
                <button type="button" class="el-button el-button--danger el-button--small" @click="dellandingPage(index)">
                  <i class="el-icon-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="landingBox">
          <el-form-item label="LandingPage">
            <div class="content">
              <el-input
                style="width:36%;"
                placeholder="请输入landingPage地址"
                v-model="landingPageURL"
                clearable>
              </el-input>
              <el-input
                placeholder="请输入点击数"
                v-model="landingPageClick"
                clearable>
              </el-input>
              <el-input
                placeholder="请输入CR"
                v-model="landingPageCR"
                clearable>
              </el-input>
              <el-input
                placeholder="请输入CVR"
                v-model="landingPageCVR"
                clearable>
              </el-input>
              <el-button size="small" type="primary" @click="savelandingPage">保存这条landingpage</el-button>
            </div>
          </el-form-item>
        </div>
        <div></div>
        <div class="three">
          <el-form-item label="ROI" prop="ROI">
            <el-input :disabled="true" v-model="getROI"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="Profit" prop="profit">
            <el-input v-model.number="ruleForm.profit"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="country" prop="country">
            <el-select v-model="ruleForm.country" placeholder="国家">
              <el-option
                v-for="item in getcountryList"
                :key="item | country_filters"
                :label="item | country_filters"
                :value="item | country_filters">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="文案标题" prop="AdvertisingTitle">
          <el-input v-model="ruleForm.AdvertisingTitle" placeholder="文案标题"></el-input>
        </el-form-item>
        <el-form-item label="文案内容" prop="Advertising">
          <el-input type="textarea" v-model="ruleForm.Advertising" :autosize="{ minRows: 2, maxRows: 10}" placeholder="文案"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材',
        list: [],
        type: '',
        landingPageURL: '',
        landingPageClick: '',
        landingPageCR: '',
        landingPageCVR: '',
        ruleForm: {
          sourceName: '',
          Angle: '',
          terrace: '',
          opeavtor: '',
          reveal: 0, // 展示
          click: 0, // 点击
          CTR: '',
          CPC: '',
          CPM: 0,
          conversion: '', // 转化
          Spent: 0, // 消费
          Revenue: 0, // 收益
          ROI: '',
          profit: '',
          country: '', // 国家
          AdvertisingTitle: '', // 文案标题
          Advertising: '', // 文案
          landingPageList: []
        },
        rules: {
          sourceName: [
            { required: true, message: '请输入作品名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          Angle: [
            { required: true, message: '请选择Angle', trigger: 'blur' },
            { message: '不 能 为 空', trigger: 'blur' }
          ],
          terrace: [
            { required: true, message: '请选择terrace', trigger: 'blur' },
            { message: '不 能 为 空', trigger: 'blur' }
          ],
          opeavtor: [
            { required: true, message: '请输入Opeavtor', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          reveal: [
            { required: true, message: '请输入展示', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
          click: [
            { required: true, message: '请输入点击数', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
//          CTR: [
//            { required: true, message: '请输入CTR', trigger: 'blur' },
//            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
//          ],
//          CPC: [
//            { required: true, message: '请输入CPC', trigger: 'blur' },
//            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
//          ],
//          CPM: [
//            { required: true, message: '请输入CPM', trigger: 'blur' },
//            { message: '内容为数字', type: 'number' }
//          ],
          conversion: [
            { required: true, message: '请输入Conversion', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
          Spent: [
            { required: true, message: '请输入消费', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
          Revenue: [
            { required: true, message: '请输入收益', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
//          ROI: [
//            { required: true, message: '请输入ROI', trigger: 'blur' },
//            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
//          ],
          profit: [
            { required: true, message: '请输入Profit', trigger: 'blur' },
            { message: '内容为数字', type: 'number' }
          ],
          country: [
            { required: true, message: '请选择国家', trigger: 'blur' },
            { message: '不 能 为 空', trigger: 'blur' }
          ],
          AdvertisingTitle: [
            { required: true, message: '请填写文案标题', trigger: 'blur' }
          ],
          Advertising: [
            { required: true, message: '请填写文案', trigger: 'blur' }
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'enctype': 'multipart/form-data'
        }
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
      },
      surplus: function (value) {
        if (value) {
          return value.toFixed(2)
        } else {
          return 0
        }
      },
      unit: function (value) {
        return value + '%'
      }
    },
    computed: {
      getuser () {
        return this.$store.state.user
      },
      getAngleList () {
        return this.$store.state.AngleList
      },
      getterraceList () {
        return this.$store.state.terraceList
      },
      getcountryList () {
        return this.$store.state.countryList
      },
      getCPM () {
        let CPM = (this.ruleForm.Spent / this.ruleForm.reveal) * 1000
        this.ruleForm.CPM = CPM.toFixed(2)
        return isNaN(this.ruleForm.CPM) ? 0 : this.ruleForm.CPM
      },
      getCTR () {
        let CTR = this.ruleForm.click / this.ruleForm.reveal
        this.ruleForm.CTR = CTR.toFixed(4)
        return isNaN(this.ruleForm.CTR) ? 0 + '%' : this.ruleForm.CTR * 100 + '%'
      },
      getCPC () { // 计算CPC值
        let CPC = this.ruleForm.Spent / this.ruleForm.click
        this.ruleForm.CPC = CPC.toFixed(2)
        return isNaN(this.ruleForm.CPC) ? 0 : this.ruleForm.CPC
      },
      getROI () { // 计算ROI
        let ROI = this.ruleForm.Revenue / this.ruleForm.Spent
        this.ruleForm.ROI = ROI.toFixed(4)
        return isNaN(this.ruleForm.ROI) ? 0 + '%' : this.ruleForm.ROI * 100 + '%'
      }
    },
    mounted () {
      this.getconfig()
    },
    methods: {
      uploadsuccess (response, file, filelist) {
        if (response.status === 0) {
          this.type = file.raw.type.slice(0, file.raw.type.indexOf('/'))
          let data = {
            id: file.uid,
            name: response.data.name,
            url: response.data.url
          }
          this.list.push(data)
        }
      },
      uploaderr (err, file, filelist) {
        if (err) {
          this.$message({
            message: '服务器错误,' + file.name + '上传失败',
            type: 'error'
          })
        }
      },
      handleRemove (file, fileList) {
        let list = this.list
        let removeId = file.uid
        for (let i = 0; i < list.length; i++) {
          if (removeId === list[i].id) {
            list.splice(i, 1)
          }
        }
        this.list = list
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      submitForm (ruleform) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.landingPageURL !== '' && this.landingPageClick !== '' && this.landingPageCR !== '' && this.landingPageCVR !== '') {
              this.$message({
                message: '请点击对勾按钮保存填写的landingPage',
                type: 'info'
              })
              return false
            }
            let result = {}
            result.sourceName = ruleform.sourceName
            result.terrace = ruleform.terrace
            result.country = ruleform.country
            result.type = this.type
            result.source = ruleform
            result.list = this.list
            result.titlePage = this.list[0]
            result.user = {
              username: this.getuser.username,
              nickname: this.getuser.nickname,
              id: this.getuser._id,
              portrait: this.getuser.portrait,
              isAdmin: this.getuser.isAdmin,
              date: this.getuser.date
            }
            this.$http.post('/api/resources/save', result).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$confirm('保存成功，接下来你要去哪里？', '提示', {
                  confirmButtonText: '去素材库',
                  cancelButtonText: '继续添加素材',
                  type: 'success'
                }).then(() => {
                  this.$router.push({path: './library'})
                  this.$store.commit('setTitle', '素材库')
                }).catch(() => {
                  this.$router.go(0)
                })
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                })
              }
            })
          } else {
            this.$alert('请把所有要求必填的内容填写完成再点击保存', '有必填内容没有输入', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '请继续填写素材'
                })
              }
            })
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      savelandingPage () {
        if (this.landingPageURL !== '' && this.landingPageClick !== '' && this.landingPageCR !== '' && this.landingPageCVR !== '') {
          let data = {}
          data.landingPageURL = this.landingPageURL
          data.landingPageClick = this.landingPageClick
          data.landingPageCR = this.landingPageCR
          data.landingPageCVR = this.landingPageCVR
          this.landingPageURL = ''
          this.landingPageClick = ''
          this.landingPageCR = ''
          this.landingPageCVR = ''
          this.ruleForm.landingPageList.push(data)
        } else {
          this.landingPageURL = ''
          this.landingPageClick = ''
          this.landingPageCR = ''
          this.landingPageCVR = ''
          this.$message({
            type: 'info',
            message: '请填写landingPage内容'
          })
        }
      },
      dellandingPage (index) {
        let data = this.ruleForm.landingPageList
        data.splice(index, 1)
        this.ruleForm.landingPageList = data
      }
    }
  }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .add{
    width: 100%;
    height: 100%;
    min-width: 1200px;
    padding-bottom: 100px;
  }
  .add-photo{
    width: 750px;
    margin: 0 auto;
  }
  .add-form{
    width: 750px;
    margin: 0px auto;
    margin-top: 50px;
  }
  .two{
    width: 370px;
    display: inline-block;
    vertical-align: top;
  }
  .three{
    width: 245px;
    display: inline-block;
    vertical-align: top;
  }
  .four{
    width: 182px;
    display: inline-block;
    vertical-align: top;
  }
  .landingBox{
    width: 100%;
  }
  .landingContainer .el-input{
    width: 18%;
  }
  .landingBox .content .el-input{
    width: 18%;
  }
</style>
