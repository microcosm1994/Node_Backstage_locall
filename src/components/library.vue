<template>
  <div calss="library">
    <h1>{{this.mytitle}}</h1>
    <div class="library-container">
      <el-table
        :data="mysource"
        :row-class-name="tableRowClassName"
        style="width: 100%;">
        <!--展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图片列表">
                <div class="table-expand">
                  <div class="table-body">
                    <el-button type="text" v-for="item in props.row.list" @click="centerDialogVisible = true">
                      <div class="photo" @click="getpic(item.url, item.name, item.id, 'image', $event)">
                        <img :src="item.url" alt="">
                      </div>
                    </el-button>
                    <!--<div v-for="item in props.row.source.list" class="photo">-->
                      <!--<img :src="item.url" alt="">-->
                      <!--<p>{{item.name}}</p>-->
                    <!--</div>-->
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="数据展示">
               <div class="table-expand">
                 <div class="table-head">
                   <span>CTR</span>
                   <span>CPC</span>
                   <span>CPM</span>
                   <span>Conversion</span>
                   <span>Spent</span>
                   <span>Revenue</span>
                   <span>ROI</span>
                 </div>
                 <div class="table-body">
                   <span class="tbody-span">{{ props.row.source.CTR }}</span>
                   <span class="tbody-span">{{ props.row.source.CPC }}</span>
                   <span class="tbody-span">{{ props.row.source.CPM }}</span>
                   <span class="tbody-span">{{ props.row.source.conversion }}</span>
                   <span class="tbody-span">{{ props.row.source.Spent }}</span>
                   <span class="tbody-span">{{ props.row.source.Revenue }}</span>
                   <span class="tbody-span">{{ props.row.source.ROI }}</span>
                 </div>
               </div>
              </el-form-item>
              <el-form-item label="landingPage" v-if="props.row.source.landingPageList.length">
                <div class="table-expand">
                  <div class="table-head">
                    <span>名称</span>
                    <span style="width:240px;">链接</span>
                    <span>点击</span>
                    <span>CR</span>
                    <span>CVR</span>
                  </div>
                  <div class="table-body" v-for="(item, index) in props.row.source.landingPageList">
                    <span>landingPage {{ index + 1 }}</span>
                    <span style="width:240px;"><a :href="item.landingPageURL" target="_blank">{{ item.landingPageURL }}</a></span>
                    <span>{{ item.landingPageClick }}</span>
                    <span>{{ item.landingPageCR }}</span>
                    <span>{{ item.landingPageCVR }}</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="文案标题">
                <div>{{ props.row.source.AdvertisingTitle }}</div>
              </el-form-item>
              <el-form-item label="文案内容">
                <div>{{ props.row.source.Advertising }}</div>
              </el-form-item>
              <!--<el-form-item label="上传账号">-->
                <!--<span>{{ props.row.user.uname }}</span>-->
              <!--</el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="70">
          <template slot-scope="scope">
            <i class="el-icon-picture-outline" v-if="scope.row.type === 'image'"></i>
            <i class="video-icon" v-if="scope.row.type === 'video'"></i>
          </template>
        </el-table-column>
        <!--日期-->
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date | datetostring}}</span>
          </template>
        </el-table-column>
        <!--缩略图-->
        <el-table-column
          label="缩略图"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" v-if="scope.row.type === 'image'">
              <p>图片名字: {{ scope.row.titlePage.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text" @click="centerDialogVisible = true">
                    <div class="source-photo" @click="getpic(scope.row.titlePage.url, scope.row.titlePage.name, scope.row.titlePage.id, scope.row.type, $event)">
                      <img :src="scope.row.titlePage.url" alt="">
                    </div>
                  </el-button>
                </div>
            </el-popover>
            <el-popover trigger="hover" placement="top" v-if="scope.row.type === 'video'">
              <p>视频名称: {{ scope.row.titlePage.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text" @click="centerDialogVisible = true">
                    <div class="source-photo" @click="getpic(scope.row.titlePage.url, scope.row.titlePage.name, scope.row.titlePage.id,scope.row.type, $event)">
                      <video width="100%" class="video-titlePage" :src="scope.row.titlePage.url" alt=""></video>
                    </div>
                  </el-button>
                </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.sourceName }}</span>
          </template>
        </el-table-column>
        <!--Angle-->
        <el-table-column
          label="Angle">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.Angle }}</span>
          </template>
        </el-table-column>
        <!--平台-->
        <el-table-column
          label="平台">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.terrace }}</span>
          </template>
        </el-table-column>
        <!--opeavtor-->
        <el-table-column
          label="opeavtor">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.opeavtor }}</span>
          </template>
        </el-table-column>
        <!--展示-->
        <el-table-column
          label="展示">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.reveal }}</span>
          </template>
        </el-table-column>
        <!--点击数-->
        <el-table-column
          label="点击数">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.click }}</span>
          </template>
        </el-table-column>
        <!--国家-->
        <el-table-column
          label="国家">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.country }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.mysourceCount">
      </el-pagination>
      <div class="picture-modal">
        <el-dialog
          :title="this.picdetailed.name"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <img :src="this.picdetailed.url" alt="" v-if="this.picdetailed.type === 'image'">
          <video width="100%" :src="this.picdetailed.url" controls v-if="this.picdetailed.type === 'video'"></video>
          <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  <!--</span>-->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'library',
    data () {
      return {
        picdetailed: {},
        centerDialogVisible: false,
        currentPage: 1,
        pageSize: 20
      }
    },
    mounted () {
      this.getAll(this.currentPage, this.pageSize)
    },
    computed: {
      mytitle () {
        return this.$store.state.title
      },
      mysource () {
        return this.$store.state.source
      },
      mysourceCount () {
        return this.$store.state.sourceCount
      },
      mysearch () {
        return this.$store.state.search
      },
      getpage () {
        return this.$store.state.page
      }
    },
    methods: {
//      隔行变色
      tableRowClassName: function ({row, rowIndex}) {
        if (rowIndex % 2 !== 1) {
//          return 'warning-row'
        } else if (rowIndex % 2 === 1) {
          return 'success-row'
        }
        return ''
      },
      getAll: function (page, size) {
        // 防止自执行函数对搜索结果数据的覆盖
        if (this.mytitle === '搜索结果') {
          return false
        }
        this.$http.get('/api/resources/all?page=' + page + '&size=' + size).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('sourceCount', data.count)
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
      getpic: function (url, name, id, type) {
        let list = {}
        list.url = url
        list.name = name
        list.id = id
        list.type = type
        this.picdetailed = list
      },
      handleSizeChange (size) {
        this.pageSize = size
        if (this.mytitle === '素材库') {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getAll(this.currentPage, this.pageSize)
        } else {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.$http.get('/api/resources/find?' + this.mysearch.label + '=' + this.mysearch.text + '&page=' + this.currentPage + '&size=' + this.getpage.size).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sourceCount', response.data.count)
              this.$store.commit('source', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
      handleCurrentChange (page) {
        this.currentPage = page
        if (this.mytitle === '素材库') {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getAll(this.currentPage, this.pageSize)
        } else {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.$http.get('/api/resources/find?' + this.mysearch.label + '=' + this.mysearch.text + '&page=' + this.currentPage + '&size=' + this.getpage.size).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sourceCount', response.data.count)
              this.$store.commit('source', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      }
    }
  }
</script>
<style>
  .library{
    padding-top: 200px;
  }
  .library-container{
    width: 100%;
    min-width: 1000px;
    padding: 20px;
  }
  .library-container .cell{
    text-align: center;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .source{
    width: 200px;
    border-radius:5px;
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
  }
  .source-photo{
    width: 120px;
    cursor: pointer;
  }
  .source-photo img{
    width: 100%;
  }
  .source-modal-picture{
    width: 200px;
    display: inline-block;
    vertical-align: middle;
  }
  .source-modal-detailed{
    width: 50%;
    margin: 0 auto;
  }
  .source-modal-detailed .el-input{
    margin-top: 20px;
  }
  .el-input.is-disabled .el-input__inner{
    color:#000;
  }
  .update-btn{
    width: 74px;
    height: 40px;
    margin: 0;
    border-radius: 3px;
    background: #fff;
    color:#606266;
    font-size:14px;
    font-weight: 500;
    border:1px solid #dcdfe6;
    line-height:1;
  }
  .update-btn:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .update-btn:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  button, .el-button, .el-dialog__headerbtn,.el-message-box__headerbtn{
    width: auto;
    height: auto;
    margin: 0;
  }
  .el-dialog__headerbtn, .el-dialog__headerbtn:hover{
    margin: 0;
    background: none;
  }
  .source-modal-picture button,.source-modal-picture button:hover,.source-modal-picture button:active,.source-modal-picture button:focus{
    background: none;
    border: none;
  }
  .source-modal-picture img{
    width: 100%;
  }
  /*.el-dialog{*/
    /*width: 70%;*/
  /*}*/
  .el-dialog__body img{
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    text-align: right;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    text-align: left;
  }
  .table-expand{
    width: 100%;
  }
  .table-expand .table-head span{
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    color:#99a9bf;
    margin-left: 10px;
  }
  .table-expand .table-body .tbody-span{
    width: 120px;
    height: 70px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    overflow: auto;
    margin-left: 10px;
  }
  .table-expand .table-body .photo{
    width: 120px;
    max-height: 200px;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
  }
  .table-expand .table-body .el-button span{
    height: auto;
  }
  .table-expand .table-body .photo img{
    width: 100%;
  }
  /*.demo-table-expand .el-form-item .el-form-item__label{*/
   /*text-align: right;*/
  /*}*/
  .video-icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../static/img/video.svg) no-repeat;
    background-size:100% 100%;
  }
</style>
