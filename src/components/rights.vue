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
        <!-- 用户数据 -->
        <el-row>
            <el-col :span="24">
                <!-- type="index" 添加索引,prop=渲染值, -->
                <el-table :data="rightList" style="width: 100%" border>
                    <el-table-column label="#" width="60" type="index"></el-table-column>
                    <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
                    <el-table-column prop="path" label="路径" width="300"></el-table-column>
                    <el-table-column prop="level" label="层级" width="300">
                        <template slot-scope="scope">
                            <span v-if="scope.row.level==='0'">壹级</span>
                            <span v-if="scope.row.level==='1'">贰级</span>
                            <span v-if="scope.row.level==='2'">叁级</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      LV2: '权限管理',
      LV3: '权限列表',
      //   用户的数据
      rightList: [],
    }
  },
  async created() {
    let res = await this.$axios.get("rights/list");
      console.log(res)
      this.rightList = res.data.data; 
  }
}
</script>

<style lang="scss" scoped>
</style>
// myBreadcrumb