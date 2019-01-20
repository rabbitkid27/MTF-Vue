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
                <el-table :data="categoriesList" style="width: 100%" border>
                    <!-- 树形table -->
                    <el-tree-grid prop="cat_name" label="分类名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children" :indentSize="30"></el-tree-grid>
                    <el-table-column prop="cat_level" label="級別" width="100">
                        <template slot-scope="prop">
                            <span v-if="prop.row.cat_level===0">壹級</span>
                            <span v-if="prop.row.cat_level===1">貳級</span>
                            <span v-if="prop.row.cat_level===2">叁級</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cat_deleted" label="是否有效" width="180">
                        <template slot-scope="prop">
                            {{prop.row.cat_deleted?'有效':'無效'}}
                        </template>
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
import ElTreeGrid from 'element-tree-grid'
// var ElTreeGrid = require('element-tree-grid');
// Vue.component(ElTreeGrid.name,ElTreeGrid);
export default {
  name: 'categories',
  components: {
    // 注册element-tree-grid组件
    ElTreeGrid
  },
  data() {
    return {
      LV2: '商品管理',
      LV3: '商品分類',
      pageData: {
        type: 3,
        //   页码
        pagenum: 1,
        // 页容量
        pagesize: 6
      },
      //   总页数
      total: 0,
      //   分類的数据
      categoriesList: []
    }
  },
  methods: {
    //封裝 獲取渲染數據的函數為getCategories 要用的時候就調用方法即可
    async getCategories() {
      let res = await this.$axios.get('categories', {
        params: this.pageData
      })
      console.log(res)
      //   打印出來的result 是一個Array↓
      this.categoriesList = res.data.data.result
      this.total = res.data.data.total
    },
    // 分頁實現 讀取每一頁跳轉的功能 需要傳入頁碼pagenum
    currentchange(pagenum) {
      this.pageData.pagenum = pagenum
      this.getCategories()
    },
    // 每页条数 改變的功能 根據page-sizes的數字而變
    sizechange(pagesize) {
      this.pageData.pagesize = pagesize // 修改頁容量的功能
      this.pageData.pagesize = 1 //每次改變了頁容量後,需要重置跳回第一頁
      this.getCategories()
    }
  },
  async created() {
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
</style>
// myBreadcrumb