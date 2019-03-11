
import NotFoundPage from '../components/error/Error_404.vue';
import LoginPage from "../views/Login.vue"
import {Route} from "vue-router/types/router";
import sec from '../utils/security'
/**
 * 静态路由配置
 * @type {*[]}
 */
export const constRoutes = [
    {
        path: "/login",
        name: 'Login',
        component: LoginPage
    },
    {
        path: "/not-found",
        name:"notFound",
        component: NotFoundPage
    }
];

/**
 * 在拦截中不要使用push()来进行跳转，否则会使浏览器的后退按钮失效
 */
export const beforeEachHandler = function(to:Route,from: Route,next: any){
    if (to.matched.length === 0){
        next({name:"notFound"});
    }

    if (to.name === "Login"){
      if (!to.params.from){
        to.params.from = "/";
      }
      next();
      return;
    }
    //判断是否有身份凭证
    if (!sec.hasToken()){
      next({name:"Login",params:{from:from.path ? from.path : "/"}})
    }else{
      next();
    }
};

