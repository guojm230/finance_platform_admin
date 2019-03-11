import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from './plugins/http/index'
import sec from './utils/security'

import './assets/font/iconfont.css'
import '@/assets/css/global.css'

import '@/plugins/element.js'

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$sec = sec;

//恢复路由
(function () {
  const menusStr = sessionStorage.getItem("SYS_MENUS");
  if (menusStr != null) {
    store.commit("commitAdminMenus", JSON.parse(menusStr));
  }
})();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
