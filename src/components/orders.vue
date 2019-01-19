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
                <el-table :data="goodsList" style="width: 100%" border>
                    <el-table-column label="#" width="40" type="index"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
                    <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
                    <el-table-column prop="goods_weight" label="商品重量" width="70"></el-table-column>
                    <el-table-column prop="add_time" label="创建时间" width="250">
                        <template slot-scope="prop">{{prop.row.add_time | afterTime}}</template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-edit" type="primary" plain></el-button>
                            <el-button size="mini" icon="el-icon-delete" type="danger" plain></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 底部的分页 -->
        <el-row>
            <el-col :span="24">
                <el-pagination :current-page="pageData.pagenum" :page-sizes="[2, 4, 6, 8, 10]" :page-size="pageData.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="currentchange" @size-change="sizechange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      LV2: '商品管理',
      LV3: '商品列表',
      pageData: {
        //   查询参数
        query: '',
        //   页码
        pagenum: 1,
        // 页容量
        pagesize: 6
      },
      //   总页数
      total: 0,
      //   用户的数据
      goodsList: []
    }
  },
  methods: {
      //封裝 獲取渲染數據的函數為getGoods 要用的時候就調用方法即可  
    async getGoods() {
      let res = await this.$axios.get('goods', {
        params: this.pageData
      })
      console.log(res)
      this.goodsList = res.data.data.goods
      this.total = res.data.data.total
    },
    // 分頁實現 讀取每一頁跳轉的功能 需要傳入頁碼pagenum
    currentchange(pagenum){
        this.pageData.pagenum = pagenum;
        this.getGoods();
    },
    // 每页条数 改變的功能 根據page-sizes的數字而變
    sizechange(pagesize){
        this.pageData.pagesize=pagesize;  // 修改頁容量的功能
        this.pageData.pagesize=1;  //每次改變了頁容量後,需要重置跳回第一頁
        this.getGoods();
    }
  },
  async created() {
    this.getGoods()
  }
}
</script>

<style lang="scss" scoped>
</style>
// myBreadcrumb