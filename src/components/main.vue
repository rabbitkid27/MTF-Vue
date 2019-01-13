<template>
    <div>
        <el-button @click="logout" type="success">退出</el-button>
    </div>
</template>

<script>
export default {
    // 聲明生命週期函數,這個beforeCreate用來檢測 用戶來到這個頁面的時候,有沒有登錄過!
    beforeCreate() {
        let token = window.sessionStorage.getItem("token");
        if(token){
            //登錄成功
        }else {
            //沒有就登錄失敗了
        this.$message.error("請先去登錄");
        //名詞:編程式導航 - location跳轉;
        //用封裝好的router來跳轉,用.push跳轉到登錄頁面: 基地址+login
        this.$router.push("login");
        }
    },
    // 這個logout是用戶點擊了退出按鈕的事件!
    methods: {
        logout(){
            window.sessionStorage.removeItem("token");
            // 編程式導航 
            this.$router.push("login");
        }
    },
}
</script>

<style>

</style>
