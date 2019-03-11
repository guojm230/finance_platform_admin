

/**
 * 全局配置
 */

export default {
  // SERVER_URL: "http://47.93.97.245/api/",
  SERVER_URL:"http://localhost:8089/",
  LOGIN_URL:"/login",
  ACCESS_TOKEN_PATH: "/oauth/token",
  TOKEN_PARAM: "authorization",
  DEFAULT_TOKEN_SAVE_MODE: "session",
  CLIENT_ID_ADMIN: "com.finance.admin",
}

export const statusCode = {
  INVALID_TOKEN: 401002,
  BAD_CREDENTIALS: 401005
};



