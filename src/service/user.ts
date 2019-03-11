import axios from '@/plugins/http'
import cof from "@/config/global";
import {Message as message} from "element-ui";
import store from '@/store'


/**
 * 菜单
 */
export interface Menu {
  id: number,
  pid: number,
  name: string,
  url: string,
  componentPath: string,
  type: string,
  orderNo: number,
  subMenus: Array<Menu>
  description?: string,
  level : number,
  leaf? : boolean
}

/**
 * 登录后拉取的登录者的必要信息
 */
export interface AccountInfo {
  accountId: number, //账户Id
  id: number | string ,
  username: number | string,
  name: string,
  type: string,
  roles: Array<string>, //角色列表
  permission: Array<string> //权限列表
}

/**
 * Token
 */
export interface Token {
  client_id: string,
  access_token: string,
  token_type: string,
  refresh_token: string,
  scope: string,
  expires_in: number,
  sign_stamp: number,
  expire_in_stamp: number
}

/**
 * 获取Token和刷新Token的参数
 */
export interface TokenParam {
  client_id: string,
  client_secret?: string,
  scope: string,
  grant_type: string,
  refresh_token?: string
}

/**
 * 从服务器获取Token并拉取必要的信息
 * @param param
 */
export const login = function (param: TokenParam): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(cof.ACCESS_TOKEN_PATH, param).then(res => {
      res.data.client_id = param.client_id;
      store.commit("commitToken", res.data);
      axios.get("/accounts/self/account-info").then(res => {
        store.commit("commitAccountInfo", res.data);
        resolve(res);
      });
    }).catch(rej => {
      message.error("账号或密码错误");
      reject(rej);
    })
  })
};

/**
 * 从服务器刷新Token
 * @param param
 */
export const refreshToken = function (param: TokenParam) :Promise<any>{
  return new Promise((resolve,reject)=>{
    axios.post(cof.ACCESS_TOKEN_PATH,param).then(res=>{
      res.data.client_id = param.client_id;
      store.commit("commitToken",res.data);
      resolve();
    }).catch(reason => {
      reject(reason);
    });
  })
};
