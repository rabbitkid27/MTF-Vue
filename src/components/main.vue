<template>
    <div class="main-container">
        
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <img src="../assets/logo.png" alt>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-light">電商後台管理系統</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple">
                            <el-button @click="logout" type="success">退出</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="201px">
                    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                        <!-- 大循環  這裡的index是當前菜單的索引值,要打開哪個,所以給累加值-->
                        <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="item.order+''">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <!-- 小循環 子菜單 -->
                            <el-menu-item v-for="(it, i) in item.children" :key="it.id" :index="'/'+it.path">
                                <i class="el-icon-menu"></i>
                                {{it.authName}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!-- 渲染嵌套路由的組件 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    }
  },
  // 聲明生命週期函數,這個beforeCreate用來檢測 用戶來到這個頁面的時候,有沒有登錄過!
  //   beforeCreate() {
  //     let token = window.sessionStorage.getItem('token')
  //     if (token) {//登錄成功
  //     } else {//沒有就登錄失敗了
  //       this.$message.error('請先去登錄')
  //       //名詞:編程式導航 - location跳轉;
  //       //用封裝好的router來跳轉,用.push跳轉到登錄頁面: 基地址+login
  //       this.$router.push('login')}},
  // 這個logout是用戶點擊了退出按鈕的事件!
  methods: {
    logout() {
      this.$confirm('你真的要退出吗?o(╥﹏╥)o', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清除登錄狀態,token
          window.sessionStorage.removeItem('token')
          // 編程式導航
          this.$router.push('login')
          //   成功的
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          // 失敗的
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.$axios.get('menus').then(res => {
      // console.log(res);
      this.menuList = res.data.data
    })
  }
}
</script>

<style lang="scss" >
// <style lang="scss" scoped>
//預處理器  集合  父選擇器[css作用域]
//css作用域:使用一个大的选择器,把一些后代选择器的范围约束在其内部.样式限定在一个区域内.
//vue中的scoped属性: 写在style标签中, 自动添加属性,自动添加属性选择器.
.main-container {
  height: 100%;
  /* element-ui的自带的类名 直接添加 */
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .el-col-18 {
      font-size: 30px;
      font-weight: 900;
      color: white;
    }
    .el-col-4 {
      text-align: left;
    }
    .el-col-2 {
      text-align: right;
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    padding-top: 0;
    // text-align: center;
    // line-height: 160px;
  }

  // 设置折叠菜单 样式
  .el-submenu__title {
    text-align: left;
  }
}
</style>
