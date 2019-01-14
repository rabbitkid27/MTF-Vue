import Vue from 'vue';
import App from './App.vue';

// 引入全局樣式
import './assets/base.css';

// 導入自己抽取的axios插件！
import VueAxios from './lib/vue-axios';
// 已經安裝插件的語法實現了install方法,可以直接通過Vue.use跟Vue進行關聯,調用插件實現install方法.
Vue.use(VueAxios);


// 導入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);  //Vue的原型上 增加了很多的方法

// 導入自己抽取的路由 router
import router from './lib/router'

// Vue.config.productionTip = false;

// 導入自己抽取的麵包屑 - 為了能夠在所有組件中使用 直接全局註冊麵包屑導航
import myBreadcrumb from './components/myBreadcrumb.vue';
// 全局註冊麵包屑組件
Vue.component('myBreadcrumb',myBreadcrumb);


new Vue({
  // 挂载到 最顶级的Vue实例上
  router,
  render: h => h(App),
}).$mount('#app')
