<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{LV2}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{LV3}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    //通過props 讓外部傳遞數據
    props:['LV2','LV3']
}
</script>

<style>
.my-el-breadcrumb{
  height: 45px;
  line-height: 45px;
}
</style>
