import Vue from "vue";
import Router from "vue-router";
import {beforeEachHandler,constRoutes} from "./config";

Vue.use(Router);

function getMode() {
  if (typeof window.history.pushState === 'function'){
    return "history";
  } else {
    return "hash";
  }
}

const router = new Router({
  // mode:getMode(),
  routes: constRoutes
});

router.beforeEach(beforeEachHandler);

export default router;
