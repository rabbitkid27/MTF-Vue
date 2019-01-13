// 導入 而且在終端安裝 cnpm i axios --save
import axios from 'axios';

// 設置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

//暴露出去
export default {
    install(Vue){
        // 4. 添加实例方法
  Vue.prototype.$axios=axios;
    }
}