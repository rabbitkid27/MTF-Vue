// 導入vue
import Vue from 'vue';
// 導入路由
import VueRouter from 'vue-router';
// 註冊插件
Vue.use(VueRouter);


// 導入路由管理的組件
import login from '../components/login.vue';
import main from '../components/main.vue';
import users from '../components/users.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'


// 寫規則
let routes = [
    {
         path: '/login', 
         component: login 
    },
    {
      path: '/', 
      redirect:'/main'
    },
    { 
        path: '/main', 
        component: main,
        children:[
          {
            path:'/users',
            component: users
          },
          {
            path:'/roles',
            component: roles
          },
          {
            path:'/rights',
            component: rights
          },
        ]
    },
    
  ]
  
//   實例化對象
  let router = new VueRouter({
    routes
  })


//   暴露router出去 讓外部訪問
export default router;