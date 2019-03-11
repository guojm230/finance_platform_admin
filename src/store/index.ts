import Vue from 'vue'
import VueX from 'vuex'
import moutations from './mutation'
//持久化插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(VueX);

const store = new VueX.Store({
  plugins: [createPersistedState({storage: window.sessionStorage})],
  state: {
    token: {},  //token
    //system
    accountInfo: {},  //accountInfo
    asideMenus: [],   //侧边菜单
    originalMenus: [] //原始菜单
  },
  mutations: moutations
});


export default store;
