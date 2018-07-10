<template>
  <div class="slogan">
    <h1>{{this.mytitle}}</h1>
    <div class="library-container">
      <el-table
        :data="myslogan"
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
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.mysloganCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'slogan_library',
    data () {
      return {
        title: '文案库',
        currentPage: 1,
        pageSize: 20
      }
    },
    computed: {
      mytitle () {
        return this.$store.state.title
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
      }
    },
    mounted () {
      this.getsloganAll(this.currentPage, this.pageSize)
    },
    methods: {
      // 隔行变色
      tableRowClassName: function ({row, rowIndex}) {
        if (rowIndex % 2 !== 1) {
//          return 'warning-row'
        } else if (rowIndex % 2 === 1) {
          return 'success-row'
        }
        return ''
      },
      getsloganAll: function (page, size) {
        // 防止自执行函数对搜索结果数据的覆盖
        if (this.mytitle === '搜索结果') {
          return false
        }
        this.$http.get('/api/resources/slogan_all?page=' + page + '&size=' + size).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('sloganCount', data.count)
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
      handleSizeChange (size) {
        this.pageSize = size
        if (this.mytitle === '文案库') {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getsloganAll(this.currentPage, this.pageSize)
        } else {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.$http.get('/api/resources/sloganfind?' + this.mysearch.label + '=' + this.mysearch.text + '&page=' + this.currentPage + '&size=' + this.pageSize).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sloganCount', response.data.count)
              this.$store.commit('slogan', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
              this.searchText = ''
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
        if (this.mytitle === '文案库') {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getsloganAll(this.currentPage, this.pageSize)
        } else {
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.$http.get('/api/resources/sloganfind?' + this.mysearch.label + '=' + this.mysearch.text + '&page=' + this.currentPage + '&size=' + this.pageSize).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sloganCount', response.data.count)
              this.$store.commit('slogan', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
              this.searchText = ''
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
  .cell {
    text-align: center;
  }
</style>
