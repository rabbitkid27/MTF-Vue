<template>
  <!-- 登录容器 -->
  <div class="login-container">
    <!-- 表单容器 -->
    <div class="form-container">
      <h2>用戶登錄頁面</h2>
      <!-- label-position前面的冒號要去掉!!!:rules="rules" ref="formData" ref是vue提供的屬性,讓我們可以給dom元素起名字! -->
      <el-form label-position="top" label-width="80px" :model="formData" :rules="rules" ref="formData">
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <!-- login-btn自定義類目 避免跟默認的衝突 -->
        <el-button class="login-btn" type="success" @click="submitForm('formData')">登錄</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      // 表单验证规则
      rules: {
           // required :必须 ;message: 提示信息 ;trigger: 触发时机;min:最短;max:最常
        username: [
          { required: true, message: '請输入用戶名', trigger: 'change' },
          {min: 3,max: 10, message: '长度在 3 到 10 个字符',trigger: 'change' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'change' },
          { min: 6, message: '长度至少要大於 6 個字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // $refs 数组 可以让我们通过 设定的名字 获取对应的dom元素
      // 通过表单元素的 validate (element-ui)增加的验证方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          //發送請求成功
          this.$axios.post('login', this.formData).then(res => {
            if (res.data.meta.status === 400) {
              //得到的status為400就是登錄錯誤了的狀態碼
              // this.$message.error(res.data.meta.msg)
            } else if (res.data.meta.status == 200) {
              //得到的status為200就是登錄成功了的狀態碼
            //   this.$message({message: res.data.meta.msg,type:'success'}) 和下面一樣
            // this.$message.success(res.data.meta.msg)
            // 保存token sessionStorage 
            // 鍵值對:(鍵:'token'這個可以隨便取名, 值:res.data.data.token是後台給的,可以在res.data.data裡看到)
            window.sessionStorage.setItem("token",res.data.data.token)
            // 去首頁 用 編程式導航 最后才能使用push去登录!注意先后顺序 先设置token再跳转!!!
            this.$router.push("/")
            }
          })
        } else {
          this.$message.error('請輸入正確的賬號與密碼 凸- -凸')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
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
  .login-btn {
    width: 100%;
  }
}
</style>
