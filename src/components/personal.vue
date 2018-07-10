<template>
  <div calss="library">
    <h1>{{title}}</h1>
    <div class="personal">
      <div class="personal-portrait" @click="toggleShow">
        <img :src="getuser.portrait" alt="">
      </div>
      <span>点击上传头像</span>
      <my-upload :field="getuser.username"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="300"
                 :height="300"
                 url="/api/picture/portrait"
                 :params="params"
                 :headers="headers"
                 img-format="png"></my-upload>
      <p>用户昵称：<span>{{getuser.nickname}}</span></p>
      <p>用户账号：<span>{{getuser.username}}</span></p>
    </div>
    <div class="library-container" v-if="this.$cookies.get('_name') !== 'admin'">
      <div class="personal-nav">
        <el-tabs type="border-card">
          <el-tab-pane label="素材">
            <el-table
              :data="this.mysource"
              :row-class-name="tableRowClassName"
              style="width: 100%;">
              <!--展开行-->
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
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
                          <span>{{ props.row.source.CTR }}</span>
                          <span>{{ props.row.source.CPC }}</span>
                          <span>{{ props.row.source.CPM }}</span>
                          <span>{{ props.row.source.conversion }}</span>
                          <span>{{ props.row.source.Spent }}</span>
                          <span>{{ props.row.source.Revenue }}</span>
                          <span>{{ props.row.source.ROI }}</span>
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
              <el-table-column label="操作"
                               width="160">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="getdetailed(scope.$index, scope.row), outerVisible = true">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="this.currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="this.pageSize"
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
          </el-tab-pane>
          <el-tab-pane label="文案">
            <el-table
              :data="this.myslogan"
              :row-class-name="tableRowClassName"
              style="width: 100%;">
              <!--日期-->
              <el-table-column
                label="日期"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.date | datetostring}}</span>
                </template>
              </el-table-column>
              <!--group-->
              <el-table-column
                label="group">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.group }}</span>
                </template>
              </el-table-column>
              <!--slogantitle-->
              <el-table-column
                label="title">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <!--slogan-->
              <el-table-column
                label="slogan">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.slogan }}</span>
                </template>
              </el-table-column>
              <!--opeavtor-->
              <el-table-column
                label="opeavtor">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.user.nickname }}</span>
                </template>
              </el-table-column>
              <!--操作-->
              <el-table-column label="操作"
                               width="160">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="getslogan_detailed(scope.$index, scope.row), sloganVisible = true">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="slogan_del(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="sloganSizeChange"
              @current-change="sloganCurrentChange"
              :current-page="this.sloganPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="this.sloganpageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.mysloganCount">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="source-modal">
      <el-dialog
        title="修改素材"
        :visible.sync="outerVisible"
        width="50%"
        center>
        <div class="update-form">
          <el-form :model="sourceModal" :rules="sourceModalRule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="素材名称" prop="sourceName">
              <el-input v-model="sourceModal.sourceName"></el-input>
            </el-form-item>
            <div class="three">
              <el-form-item label="素材分类" prop="Angle">
                <el-select v-model="sourceModal.Angle" placeholder="分类">
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
                <el-select v-model="sourceModal.terrace" placeholder="平台">
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
              <el-form-item label="opeavtor" prop="opeavtor">
                <el-input :disabled="true" v-model="sourceModal.opeavtor"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="two">
              <el-form-item label="展示" prop="reveal">
                <el-input v-model.number="sourceModal.reveal"></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item label="点击数" prop="click">
                <el-input v-model.number="sourceModal.click"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="three">
              <el-form-item label="conversion" prop="conversion">
                <el-input v-model.number="sourceModal.conversion"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="Spent" prop="Spent">
                <el-input v-model.number="sourceModal.Spent"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="Revenue" prop="Revenue">
                <el-input v-model.number="sourceModal.Revenue"></el-input>
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
                <el-input v-model.number="sourceModal.profit"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="country" prop="country">
                <el-select v-model="sourceModal.country" placeholder="国家">
                  <el-option
                    v-for="item in getcountryList"
                    :key="item | country_filters"
                    :label="item | country_filters"
                    :value="item | country_filters">
                  </el-option>
                </el-select>
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
            <div class="landingContainer" ref="landingContainer" v-if="this.sourceModal.landingPageList.length">
              <div class="el-form-item" v-for="(item, index) in this.sourceModal.landingPageList">
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
                  <el-button size="small" type="primary" icon="el-icon-check" @click="savelandingPage"></el-button>
                </div>
              </el-form-item>
            </div>
            <div></div>
            <el-form-item label="文案标题" prop="Advertising">
              <el-input v-model="sourceModal.AdvertisingTitle" ></el-input>
            </el-form-item>
            <el-form-item label="文案内容" prop="Advertising">
              <el-input type="textarea" v-model="sourceModal.Advertising" :autosize="{ minRows: 2, maxRows: 10}"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="update">保 存</el-button>
          <el-button type="primary" @click="outerVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="slogan-modal">
      <el-dialog
        title="修改文案"
        :visible.sync="sloganVisible"
        width="50%"
        center>
        <div class="update-form">
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
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="slogan_update()">保 存</el-button>
          <el-button type="primary" @click="sloganVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: 'library',
    data () {
      return {
        title: '个人详情',
        sourceIndex: '',
        sourceModalId: '',
        sourceModalName: '',
        landingPageURL: '',
        landingPageClick: '',
        landingPageCR: '',
        landingPageCVR: '',
        sourceModal: {
          sourceName: '',
          Angle: '',
          terrace: '',
          opeavtor: '',
          reveal: '', // 展示
          click: '', // 点击
          CTR: '',
          CPC: '',
          CPM: '',
          conversion: '', // 转化
          Spent: '', // 消费
          Revenue: '', // 收益
          ROI: '',
          profit: '',
          country: '', // 国家
          AdvertisingTitle: '', // 文案标题
          Advertising: '', // 文案
          landingPageList: []
        },
        sourceModalRule: {
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
        picdetailed: {},
        outerVisible: false,
        centerDialogVisible: false,
        currentPage: 1,
        pageSize: 20,
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '', // the datebase64 url of created image
        group: '',
        slogan: '',
        slogantitle: '',
        sloganVisible: false,
        sloganPage: 1,
        sloganpageSize: 20,
        sloganid: '',
        sloganindex: ''
      }
    },
    components: {
      'my-upload': myUpload // 头像裁剪组件
    },
    mounted () {
      this.getPersonal(this.currentPage, this.pageSize)
      this.getslogan_Personal(this.sloganPage, this.sloganpageSize)
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
      myslogan () {
        return this.$store.state.slogan
      },
      mysloganCount () {
        return this.$store.state.sloganCount
      },
      mysearch () {
        return this.$store.state.search
      },
      getpage () {
        return this.$store.state.page
      },
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
        let CPM = (this.sourceModal.Spent / this.sourceModal.reveal) * 1000
        this.sourceModal.CPM = CPM.toFixed(2)
        return isNaN(this.sourceModal.CPM) ? 0 : this.sourceModal.CPM
      },
      getCTR () {
        let CTR = this.sourceModal.click / this.sourceModal.reveal
        this.sourceModal.CTR = CTR.toFixed(2)
        return isNaN(this.sourceModal.CTR) ? 0 + '%' : this.sourceModal.CTR * 100 + '%'
      },
      getCPC () { // 计算CPC值
        let CPC = this.sourceModal.Spent / this.sourceModal.click
        this.sourceModal.CPC = CPC.toFixed(2)
        return isNaN(this.sourceModal.CPC) ? 0 : this.sourceModal.CPC
      },
      getROI () { // 计算ROI
        let ROI = this.sourceModal.Revenue / this.sourceModal.Spent
        this.sourceModal.ROI = ROI.toFixed(2)
        return isNaN(this.sourceModal.ROI) ? 0 + '%' : this.sourceModal.ROI * 100 + '%'
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
      getPersonal: function (page, size) {
        if (this.$cookies.get('_name') === 'admin') {
          return false
        }
        this.$http.get('/api/resources/personal?page=' + page + '&size=' + size).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('sourceCount', data.count)
            this.$store.commit('source', data.data)
            this.$store.commit('setTitle', '素材库')
          } else {
            this.$store.commit('source', data.data)
            this.$message({
              message: data.message,
              type: 'info'
            })
          }
        })
      },
      getdetailed: function (index, row) {
        this.getconfig()
        this.sourceIndex = index
        this.sourceModalId = row._id
        this.sourceModalName = row.user.username
        this.sourceModal.sourceName = row.source.sourceName
        this.sourceModal.Angle = row.source.Angle
        this.sourceModal.terrace = row.source.terrace
        this.sourceModal.opeavtor = row.source.opeavtor
        this.sourceModal.reveal = row.source.reveal
        this.sourceModal.click = row.source.click
        this.sourceModal.CTR = row.source.CTR
        this.sourceModal.CPC = row.source.CPC
        this.sourceModal.CPM = row.source.CPM
        this.sourceModal.conversion = row.source.conversion
        this.sourceModal.Spent = row.source.Spent
        this.sourceModal.Revenue = row.source.Revenue
        this.sourceModal.ROI = row.source.ROI
        this.sourceModal.profit = row.source.profit
        this.sourceModal.AdvertisingTitle = row.source.AdvertisingTitle
        this.sourceModal.Advertising = row.source.Advertising
        this.sourceModal.country = row.source.country
        this.sourceModal.landingPageList = row.source.landingPageList
      },
      getpic: function (url, name, id, type) {
        let list = {}
        list.url = url
        list.name = name
        list.id = id
        list.type = type
        this.picdetailed = list
      },
      update: function () {
        let username = this.$cookies.get('_name')
        if (username !== this.sourceModalName) {
          this.$message({
            message: '没有修改权限，请联系上传者修改',
            type: 'error'
          })
          return false
        }
        let data = {}
        data._id = this.sourceModalId
        data.source = this.sourceModal
        this.$http.put('/api/picture/update', data).then((response) => {
          if (response.data.status === 0) {
            this.mysource[this.sourceIndex].source = response.data.data.source
            this.$store.commit('source', this.mysource)
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
      del: function (index, row) {
        this.sourceModalName = row.user.username
//        let source = this.mysource
//        console.log(source)
//        return false
        let username = this.$cookies.get('_name')
        if (username !== this.sourceModalName) {
          this.$message({
            message: '没有修改权限，请联系上传者修改',
            type: 'error'
          })
          return false
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/picture/del?_id=' + row._id).then((response) => {
            if (response.data.status === 0) {
              for (let i = 0; i < this.mysource.length; i++) {
                if (row._id === this.mysource[i]._id) {
                  this.mysource.splice(i, 1)
                }
              }
              this.$message({
                message: '已删除!'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      },
      // 改变每页条数时触发
      handleSizeChange (size) {
        this.pageSize = size
        this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
        this.getPersonal(this.currentPage, this.pageSize)
      },
      // 改变页数时触发
      handleCurrentChange (page) {
        this.currentPage = page
        this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
        this.getPersonal(this.currentPage, this.pageSize)
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
          this.sourceModal.landingPageList.push(data)
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
        let data = this.sourceModal.landingPageList
        data.splice(index, 1)
        this.sourceModal.landingPageList = data
      },
      toggleShow () {
        this.show = !this.show
        console.log(this.getuser)
      },
      cropSuccess (imgDataUrl, field) {
        console.log('-------- crop success --------')
        this.imgDataUrl = imgDataUrl
      },
      cropUploadSuccess (jsonData, field) {
        this.$store.commit('setuser', jsonData.data)
      },
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      },
      // 文案
      slogan_update () {
        if (this.group !== '' && this.slogan !== '') {
          let self = this
          let data = {}
          let result = {}
          result.group = this.group
          result.title = this.slogantitle
          result.slogan = this.slogan
          result.user = this.getuser
          data.slogan = result
          data._id = this.sloganid
          this.$http.put('/api/picture/slogan_update', data).then((response) => {
            if (response.data.status === 0) {
              let data = this.myslogan
              data[this.sloganindex].group = response.data.data.group
              data[this.sloganindex].title = response.data.data.title
              data[this.sloganindex].slogan = response.data.data.slogan
              this.$store.commit('slogan', data)
//              this.getslogan_Personal(this.sloganPage, this.sloganpageSize)
              self.$message({
                message: response.data.message,
                type: 'success'
              })
            } else {
              self.$message.error(response.data.message)
            }
          })
        }
      },
      getslogan_Personal: function (page, size) {
        if (this.$cookies.get('_name') === 'admin') {
          return false
        }
        this.$http.get('/api/resources/slogan_personal?page=' + page + '&size=' + size).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('sloganCount', data.count)
            this.$store.commit('slogan', data.data)
            this.$store.commit('setTitle', '文案库')
          } else {
            this.$store.commit('slogan', data.data)
            this.$message({
              message: data.message,
              type: 'info'
            })
          }
        })
      },
      // 改变每页条数时触发
      sloganSizeChange (size) {
        this.sloganPage = size
        this.$store.commit('page', {page: this.currentPage, size: this.sloganpageSize})
        this.getslogan_Personal(this.sloganPage, this.sloganpageSize)
      },
      // 改变页数时触发
      sloganCurrentChange (page) {
        this.sloganPage = page
        this.$store.commit('page', {page: this.sloganPage, size: this.sloganpageSize})
        this.getslogan_Personal(this.sloganPage, this.sloganpageSize)
      },
      // 获取文案内容
      getslogan_detailed: function (index, row) {
        this.group = row.group
        this.slogan = row.slogan
        this.slogantitle = row.title
        this.sloganid = row._id
        this.sloganindex = index
      },
      slogan_del: function (index, row) {
        let username = this.$cookies.get('_name')
        if (username !== row.user.username) {
          this.$message({
            message: '没有修改权限，请联系上传者修改',
            type: 'error'
          })
          return false
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/picture/slogan_del?_id=' + row._id).then((response) => {
            if (response.data.status === 0) {
              for (let i = 0; i < this.myslogan.length; i++) {
                if (row._id === this.myslogan[i]._id) {
                  this.myslogan.splice(i, 1)
                }
              }
              this.$message({
                message: '已删除!'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
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
  .table-expand .table-body span{
    width: 120px;
    height: 70px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    overflow: auto;
    margin-left: 10px;
  }
  /*.demo-table-expand .el-form-item .el-form-item__label{*/
  /*text-align: right;*/
  /*}*/
  .update-form{
    width: 100%;
    max-width: 750px;
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
  .video-icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../static/img/video.svg) no-repeat;
    background-size:100% 100%;
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
  .personal-portrait{
    width: 100px;
    height: 100px;
    margin: 30px auto;
    border-radius:50%;
    overflow: hidden;
    cursor: pointer;
  }
  .personal-portrait img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>
