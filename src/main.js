import Vue from 'vue'
import App from './App.vue'

// 引入全局樣式
import './assets/base.css'

// 導入EL-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
