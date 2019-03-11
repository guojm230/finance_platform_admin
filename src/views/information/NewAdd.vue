<template>
    <section class="p-wrapper container">
        <div>
            <el-form
                label-width="120px"
            >
                <el-form-item label="标题">
                    <el-col :span="10">
                        <el-input v-model="news.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="类型" style="z-index: 5">
                    <el-select
                            v-model="news.type"
                        default-first-option
                    >
                        <el-option
                            label="新闻"
                            value="news"
                        >
                        </el-option>
                        <el-option
                                label="案例"
                                value="example"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题图片(可选)">
                    <el-upload
                            :action="action"
                            :headers="headers"
                            :disabled="disable"
                            list-type="picture-card"
                            :on-remove="onRemove"
                            :on-success="uploadSuccess"
                            :on-preview="handlePictureCardPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
        </div>

        <article-editor ref="editor"></article-editor>

        <div style="margin-top: 15px;text-align: center">
            <el-button typeof="primary" round @click="commit">发布</el-button>
        </div>
    </section>
</template>

<script>

  import cof from "@/config/global"
  import {resolveStaticPath} from "@/utils/common"
  import ArticleEditor from "./components/ArticleEditor";
  const regex = new RegExp("<img.*?(?:>|/>)","g");

  const E = window.wangEditor;
  let editor;
  export default {
    name: "NewAdd",
    components: {ArticleEditor},
    data(){
      return {
        imagePaths:[],
        news:{
          type:'news',
          title:'',
        },
        action: cof.SERVER_URL+"resources",
        headers:{
          authorization: 'bearer '+this.$sec.getAccessToken()
        },
        disable:false,
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    methods:{
      commit(){
        this.news.content = this.$refs.editor.text();
        this.$http.post("news",this.news).then(res=>{
          this.$message("发布成功");
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(response,file,fileList){
        this.news.titlePhotoId = response;
        this.disable = true;
      },
      onRemove(){
        this.disable = false
      }
    }
  }
</script>

<style scoped>
    .editor-text{
        min-height: 800px;
    }
</style>

