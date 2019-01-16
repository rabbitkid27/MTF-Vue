<template>
    <div class="user-container">
        <!-- 顶部面包屑 -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <myBreadcrumb :LV2="LV2" :LV3="LV3"></myBreadcrumb>
                </div>
            </el-col>
        </el-row>
        <!-- 操纵框 -->
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input placeholder="请输入内容" v-model="pageData.query">
                        <template slot="append">
                            <i class="el-icon-search"></i>
                        </template>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-button type="success" plain>添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 用户数据 -->
        <el-row>
            <el-col :span="24">
                <!-- type="index" 添加索引,prop=渲染值, -->
                <el-table :data="userList" style="width: 100%" border>
                    <el-table-column label="#" width="30" type="index"></el-table-column>
                    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
                    <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
                    <el-table-column label="用户状态" width="80">
                        <template slot-scope="scope">
                            <!-- 这里最难,不懂要提问 -->
                            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-edit" type="primary" plain></el-button>
                            <el-button size="mini" icon="el-icon-delete" type="danger" plain></el-button>
                            <el-button size="mini" icon="el-icon-check" type="warning" plain></el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 底部的分页 -->
        <el-row>
            <el-col :span="24">
                <el-pagination :current-page="pageData.pagenum" :page-sizes="[2, 4, 6, 8, 10]" :page-size="pageData.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      LV2: '用户管理',
      LV3: '用户列表',
      pageData: {
        //   查询参数
        query: '',
        //   页码
        pagenum: 1,
        // 页容量
        pagesize: 10
      },
      //   总页数
      total: 0,
      //   用户的数据
      userList: []
    }
  },
  created() {
    //   get的发送方式的其中一个写法需要写 , {params:??}
    // 原始写法: `users?pagenum=${this.pageData.pagenum}&pagesize=${this.pageData.pagesize}`
    this.$axios.get('users', { params: this.pageData }).then(res => {
      console.log(res)
      this.userList = res.data.data.users
      this.total = res.data.data.total
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
// myBreadcrumb