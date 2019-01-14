// 導入 而且在終端安裝 cnpm i axios --save
import axios from 'axios';
// 導入 element-ui的部分組件-message
import {Message} from 'element-ui';

// 設置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

//請求攔截器:
//請求發送之前 會觸發這個回調函數,修改請求的設置
axios.interceptors.request.use(config=> {
    // 判斷請求的是 - 登錄 or其他的url地址
    if(config.url.indexOf('/login')!= -1){
        // 登錄接口 存在 就登錄了的
    }else {
    config.headers.Authorization=window.sessionStorage.getItem('token');
    }
    //返回處理過的axios設置
    return config;
  },  error=> {
    //   出錯了
    return Promise.reject(error);
  });
  
 //響應攔截器:
//  請求響應回來之後 會觸發這個回調函數
axios.interceptors.response.use (response=>{
// 根據響應的狀態碼 統一用戶提示
if (response.data.meta.status === 200){
    // 成功 提示返回的信息
    // Vue.prototype.$message.success(response.data.meta.msg);
    Message.success(response.data.meta.msg);
} else if(response.data.meta.status === 400){
    // 失敗 提示 返回的信息
    Message.error(response.data.meta.msg);
}
    return response;
  }, error=> {
    return Promise.reject(error);
  });


//暴露出去(vue的插件)
// vue的插件必須實現 Vue會內部調用install方法,這個單詞只是業內約定俗成的!
export default {
    install(Vue){
        // console.log(Vue); 
        // 4. 添加实例方法
  Vue.prototype.$axios=axios;
    }
}
//install ↓這個是上面簡寫版本的完整版.
// let vueAxios = {}
// vueAxios.install = function(Vue){
//   Vue.prototype.$axios = axios;
// }
// export default vueAxios;