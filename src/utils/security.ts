import cof from '../config/global'
import {AccountInfo, Token,login,refreshToken} from "@/service/user";
import store from '../store'
import router from "@/router";

class SecurityUtil {

  private static token: Token;

  static hasToken(): boolean {
    let access_token = SecurityUtil.getToken().access_token;
    return access_token !== undefined && access_token !== null;
  }

  static isAuthenticated(): boolean {
    return this.hasToken();
  }

  static toLogin(fromPath?: string){
    router.push(fromPath)
  }

  static setToken(token: Token) {
    store.commit("commitToken", token);
  }

  static getToken(): Token {
    return store.state.token;
  }

  static getAccessToken(): string {
    return SecurityUtil.getToken().access_token;
  }

  /**
   * 提前五分钟失效
   */
  static isAccessTokenExpired(): boolean {
    let token = SecurityUtil.getToken();
    return token.expire_in_stamp - new Date().getTime() < 1000 * 60 * 30;
  }

  static getAccountInfo(): AccountInfo {
    return store.state.accountInfo;
  }

  static setAccountInfo(info: AccountInfo): void {
    store.commit("commitAccountInfo", info)
  }

  private static clearToken(): void {
    store.commit("commitToken", {});
  }

  static logout(): void {
    SecurityUtil.clearToken();
  }

  static login(username: string, password: string): Promise<any> {
    const param = {
      client_id: cof.CLIENT_ID_ADMIN,
      scope: "all",
      grant_type: "password",
      username,
      password
    };
    return login(param);
  }

  static refreshToken(): Promise<any> {
    if (!this.hasToken()) {
      return Promise.reject();
    }
    const param = {
      client_id: SecurityUtil.getToken().client_id,
      scope: "all",
      grant_type: "refresh_token",
      refresh_token: SecurityUtil.getToken().refresh_token
    };
    return refreshToken(param);
  }
}


export default SecurityUtil;
