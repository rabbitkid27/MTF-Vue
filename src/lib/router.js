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
import goods from '../components/goods.vue'
import categories from '../components/categories.vue'


// 寫規則
let routes = [
    {//path路径  component组件
      path: '/login', 
      component: login 
    },
    {
      path: '/',
      component: main,
      children:[
          {
            path:'users',
            component: users
          },
          {
            path:'roles',
            component: roles
          },
          {
            path:'rights',
            component: rights
          },
          {
            path:'goods',
            component: goods
          },
          {
            path:'categories',
            component: categories
          },
        ]
    },
    
  ]
  
//   實例化對象
  let router = new VueRouter({
    routes
  })

// 注册导航守卫(回调函数)
router.beforeEach((to, from, next) => {
  // console.log("執行了");
  // console.log(to);
  // console.log(from);
   // next 方法如果不执行 就不会跳转
  // next(); //這個next要不要都可以的,不會影響...
  if(to.path==='/login'){
    next();
      // 登录页 不需要判断
  }else{
    let token = window.sessionStorage.getItem('token');
    if (token) {
      //登錄成功
      //繼續訪問
      next();
    } else { 
      //沒有就登錄失敗了 没有token 没有登录
      // 这里不是Vue实例 无法通过this访问 但是可以访问到Vue构造函数 可以通过原型访问
      Vue.prototype.$message.error('請先去登錄');
      // 打会登录页 可以使用next 进行路由跳转
      next('/login');
    }
  }
  
})


//   暴露router出去 讓外部訪問
export default router;