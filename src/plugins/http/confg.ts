//设置默认post的Content-Type
import cof,{statusCode as code} from "@/config/global";
import sec from "@/utils/security";
import axiosQueue from './AxiosQueue';
import {Message as msg,MessageBox as msb} from "element-ui";
import qs from 'qs'
import axios from 'axios';


const instance = axios.create({
  baseURL: cof.SERVER_URL,
  transformRequest: [function (data) {  //覆盖默认的拦截
    return data;
  }],
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

export function preResolve(config) {
  const data = config.data;
  const headers = config.headers;

  if (data != null && typeof data === 'object') {
    const  ct = headers[config.method.toLowerCase()]['Content-Type'];

    if (ct === 'application/json;charset=utf-8') {
      config.data = JSON.stringify(data);
    }

    //如果content-type为form形式，需要对对象进行格式化
    if (ct === 'application/x-www-form-urlencoded;charset=utf-8') {
      config.data = qs.stringify(data);
    }
  }

  if (sec.hasToken()){
    const token = sec.getToken();
    //携带token
    config.headers['authorization'] =  token.token_type+" "+token.access_token;
  }
}

function requestFulfilledInterceptor(config) {
  //预处理
  preResolve(config);
  //请求token,不再拦截
  if (config.url === cof.ACCESS_TOKEN_PATH){
    delete config.headers['authorization'];
    return config;
  }
  if (axiosQueue.locking){
    return new Promise(((resolve, reject) => {
      this.pushTask({resolve,config});
    }))
  }

  if (sec.hasToken()) {
    //检测token是否过期
    if (sec.isAccessTokenExpired()){
      //开始刷新token
      axiosQueue.locking = true;
      return new Promise(((resolve, reject) => {
        //挂起当前请求
        axiosQueue.pushTask({resolve,config});

        sec.refreshToken().then(res=>{
          //解锁
          axiosQueue.locking = false;
          axiosQueue.executeAll();
        }).catch(reason => {
          axiosQueue.locking = false;
          throw new Error();
        })
      }))
    }
  }
  return config;
}

function responseRejectedInterceptor (error) {
  const status = error.response.status;
  let handled = false;
  /**
   * 服务器错误
   */
  if (status === 500) {
    msg.error("服务器异常");
    handled = true;
  }

  if (status === 401){
    switch (error.response.code) {
      case code.INVALID_TOKEN:
        handled = true;
        handledInvalidToken();
        break;
    }
  }

  return Promise.reject({
    response: error.response,
    handled: handled
  });
}

function handledInvalidToken(){
  msb.confirm('登录已经失效, 是否跳转到登录页面?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    sec.toLogin();
  }).catch()
}

instance.interceptors.request.use(requestFulfilledInterceptor);
instance.interceptors.response.use(function (res) {
  return res;
},responseRejectedInterceptor);

export default instance;

export const requestInterceptor = {
  onFulfilled: requestFulfilledInterceptor,
  onRejected: ()=>{}
};

export const responseInterceptor = {
  onFulfilled: (response) => response,
  onRejected: responseRejectedInterceptor
};
