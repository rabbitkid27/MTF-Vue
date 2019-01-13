<template>
  <div class="login-container">
    <div class="form-container">
      <h2>用戶登錄頁面</h2>
      <el-form :label-position="top" label-width="80px" :model="formData">
        <el-form-item label="用戶名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
          <el-button class="login-btn" type="success">登錄</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData:{
        username:"",
        password:"",
      }
    }
  },
}
</script>

<style lang="scss">
.login-container{
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-container {
    background-color: white;
    width: 580px;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .login-btn{
    width: 100%;
  }
}

</style>
