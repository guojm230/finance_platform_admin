import cof from '../config/global'


function isLoginSubmission(url: string,method: string) {
    return url.substring(url.indexOf("#/")+1,url.lastIndexOf("?")) === cof.LOGIN_URL
        && method.toLowerCase() === 'post'
}

function getContextPath(url: string) {
    return url.substring(url.indexOf("#/")+1);
}

function clone(source: any): any {
  return JSON.parse(JSON.stringify(source));
}

export default {
  isLoginSubmission: isLoginSubmission,
  getContextPath: getContextPath,
  clone: clone,
}

export const resolveStaticPath = function (staticPath: string): string {
  if (!staticPath){
    return '';
  }
  if (staticPath.startsWith("/")){
    staticPath = staticPath.substring(1);
  }
  return cof.SERVER_URL+staticPath;
};

function resolveContent(content) {
  if (!content){
    return '';
  }
  const regex = new RegExp('\\$\\{img\\[(.+)\\]\\}','g');

  let result;
  while ((result = regex.exec(content)) != null){
    let img = '<img src="'+ resolveStaticPath(result[1]) + '" >';
    content = content.replace(result[0],img);
  }
  return content;
}

//去除图片和空白
function resolveSimpleContent(content,length) {
  if (!content){
    return '';
  }

  if (!length){
    length = 300;
  }
  const regex = new RegExp('\\$\\{img\\[(.+)\\]\\}','g');

  let result;

  while ((result = regex.exec(content)) != null){
    content = content.replace(result[0],'');
  }
  content = content.replace(/\s|(<p>|<\/p>)/g,'');
  return content.substring(0,(length + 1));
}

export const articleUtil = {
  resolveContent: resolveContent,
  resolveSimpleContent: resolveSimpleContent
};
