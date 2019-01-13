// 導入vue
import Vue from 'vue';
// 導入路由
import VueRouter from 'vue-router';
// 註冊插件
Vue.use(VueRouter);


// 導入路由管理的組件
import login from '../components/login.vue';
import main from '../components/main.vue';


// 寫規則
let routes = [
    {
         path: '/login', 
         component: login 
        },
    { 
        path: '/', 
        component: main 
    }
  ]
  
//   實例化對象
  let router = new VueRouter({
    routes
  })


//   暴露router出去 讓外部訪問
export default router;