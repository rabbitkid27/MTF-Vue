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
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-button type="success" plain>添加分類</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 用户数据 -->
        <el-row>
            <el-col :span="24">
                <!-- type="index" 添加索引,prop=渲染值, -->
                <el-table :data="goodsList" style="width: 100%" border>
                    <el-table-column prop="goods_name" label="分類名稱" width="330"></el-table-column>
                    <el-table-column prop="goods_price" label="級別" width="180"></el-table-column>
                    <el-table-column prop="goods_weight" label="是否有效" width="180"></el-table-column>
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
      LV3: '商品分類',
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