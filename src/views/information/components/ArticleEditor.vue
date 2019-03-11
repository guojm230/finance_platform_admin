<template>

    <div id="editor">

    </div>

</template>

<script>
  import cof from "@/config/global"
  import {resolveStaticPath} from "@/utils/common"
  const regex = new RegExp("<img.*?(?:>|/>)","g");

  const E = window.wangEditor;
  let editor;

  export default {
    name: "ArticleEditor",
    data(){
      return {
        imagePaths:[]
      }
    },
    methods:{
      initEditor(token) {
        let vue = this;
        editor = new E('#editor');
        editor.customConfig.showLinkImg = false;
        editor.customConfig.uploadImgServer = cof.SERVER_URL + 'resources/upload';
        editor.customConfig.uploadImgHeaders = {
          'authorization': 'bearer ' + token
        };

        editor.customConfig.uploadFileName = 'file';

        editor.customConfig.uploadImgHooks = {
          success: function (xhr, editor, result) {

          },
          customInsert: function (insertImg, result, editor) {
            let url = resolveStaticPath(result.savePath);
            vue.imagePaths.push(result.savePath);
            insertImg(url)
          }
        };
        editor.create();
      },
      //处理图片内容，将图片替换为服务器可识别的内容
      resolveContent(){
        let text = editor.txt.html();
        for (let i = 0;;i++){
          let result = regex.exec(text);
          if (result === null){
            break;
          }
          if (result[0].indexOf(cof.SERVER_URL) !== -1){
            text = text.replace(result[0],"${img["+this.imagePaths[i]+"]}");
          }
        }
        return text;
      },
      text(){
        return this.resolveContent();
      }
    },
    mounted:function () {
      this.initEditor(this.$sec.getAccessToken());
    }
  }
</script>

<style scoped>

</style>
