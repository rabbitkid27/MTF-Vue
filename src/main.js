import Vue from 'vue'
import App from './App.vue'

// 引入全局樣式
import './assets/base.css'

// 導入自己抽取的axios插件！
import VueAxios from './lib/vue.axios'
// 已經安裝插件的語法實現了install方法,可以直接通過Vue.use跟Vue進行關聯
Vue.use(VueAxios);


// 導入EL-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
