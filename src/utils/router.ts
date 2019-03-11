import router from "../router/index"
import Main from "../views/Main.vue"
import {Menu} from "@/service/user";
import {RouteConfig} from "vue-router";

const rootRoutes: Array<RouteConfig> = [
    {
        path: "/",
        component: Main,
        children: []
    }
];

function addMenusToRoutes(menus: Array<Menu>) {
  const flatMenus: Array<Menu> = [];

  menus.forEach(menu => {
    flatMenuList(menu, flatMenus)
  });

  flatMenus.forEach(menu => {
    const route: RouteConfig = {
      path:"",
      component: () => import("../views/" + menu.componentPath),
      children: []
    };

    if (menu.url.startsWith("@")) {
      route.path = menu.url.substring(1);
      rootRoutes.push(route)
    } else {
      route.path = menu.url;
      if (rootRoutes[0].children){
        rootRoutes[0].children.push(route);
      }
    }
  });

  rootRoutes[0].redirect = flatMenus[0].url;
  router.addRoutes(rootRoutes);
}


/**
 * 只提取出最底层的menu
 */
function flatMenuList(menu: Menu,menuArray: Array<Menu>){
    if (!menu.subMenus || menu.subMenus.length == 0){
        if (menu.url){
            menuArray.push(menu)
        }
    }else{
        menu.subMenus.forEach(cm=>flatMenuList(cm,menuArray))
    }
}

function removeHiddenMenus(menus: Array<Menu>) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.type === "hidden") {
      menus.splice(i, 1);
      i--;
    }
    if (menu.subMenus != null && menu.subMenus.length > 0) {
      removeHiddenMenus(menu.subMenus);
    }
  }
}

export default {
  addMenusToRoutes: addMenusToRoutes,
  removeHiddenMenus: removeHiddenMenus
}
