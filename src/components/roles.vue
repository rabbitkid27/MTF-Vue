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
                    <el-button type="primary" plain>添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 用户数据 -->
        <el-row>
            <el-col :span="24">
                <!-- type="index" 添加索引,prop=渲染值, -->
                <el-table :data="rolesList" style="width: 100%" border>
                    <!-- 展開的table -->
                    <el-table-column type="expand">
                        <!-- 模板 -->
                        <template slot-scope="props">
                            <!-- tag標籤 有可移除的樣式 -->
                            <el-row v-for="item in props.row.children" :key="item.id">
                                <el-col :span="4">
                                    <el-tag closable>{{item.authName}}</el-tag>
                                    <!-- 小箭頭 -->
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <!-- 二級菜單 需獨佔一行 所以用row嵌套-->
                                <el-col :span="20">
                                    <el-row v-for="level2 in item.children" :key="level2.id">
                                        <el-col :span="4">
                                            <el-tag closable type="success">{{level2.authName}}</el-tag>
                                            <i class="el-icon-arrow-right"></i>
                                        </el-col>
                                        <!-- 三級菜單 和二級菜單是平級的 -->
                                        <el-col :span="20">
                                            <el-tag v-for="level3 in level2.children" :key="level3.id" closable type="warning">{{level3.authName}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <!-- 要麼沒有權限 沒法獲取 -->
                            <el-row v-if="props.row.children.length==0">
                                <el-col :span="24">沒有分配權限</el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="#" width="30" type="index"></el-table-column>
                    <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
                    <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      LV2: '用户管理',
      LV3: '用户列表',
      //   用户的数据
      rolesList: []
    }
  },
  async created() {
    let res = await this.$axios.get('roles');
    // console.log(res)
    this.rolesList = res.data.data;
  }
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 10px;
}
</style>
// myBreadcrumb