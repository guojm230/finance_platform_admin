import adminRouterUtil from "../utils/router"
import {AccountInfo, Menu, Token} from "@/service/user";
import util from "../utils/common"

const mutations = {
  commitAccountInfo(state, accountInfo: AccountInfo) {
    state.accountInfo = accountInfo;
  },
  commitToken(state, token: Token){
    state.token = token
  },
  commitAdminMenus(state, menuList: Array<Menu>) {
    const originalMenus = util.clone(menuList); //浅拷贝一份
    adminRouterUtil.removeHiddenMenus(menuList);

    state.originalMenus = originalMenus;
    state.asideMenus = menuList;
    //添加路由
    adminRouterUtil.addMenusToRoutes(originalMenus);
    //储存到sessionStorage
    sessionStorage.setItem("SYS_MENUS", JSON.stringify(originalMenus));
  }
};



export default mutations;

