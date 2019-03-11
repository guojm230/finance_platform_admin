<template>
    <section class="p-wrapper container">
        <div>
            <el-form
                label-position="right"
                label-width="120px"
            >
                <el-form-item label="标题">
                    <el-col :span="10">
                        <el-input v-model="policy.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="政策等级">
                    <el-select
                            v-model="policy.levelType"
                            default-first-option
                    >
                        <el-option
                                label="国级"
                                value="country"
                        >
                        </el-option>
                        <el-option
                                label="省级"
                                value="province"
                        >
                        </el-option>
                        <el-option
                                label="市级"
                                value="city"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件索引号">
                    <el-col :span="10">
                        <el-input v-model="policy.indexNumber"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发布机关">
                    <el-col :span="10">
                        <el-input v-model="policy.issueOrganization"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发文字号">
                    <el-col :span="10">
                        <el-input v-model="policy.issuedNumber"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="主题词">
                    <el-col :span="10">
                        <el-input v-model="policy.subjectWords"></el-input>
                    </el-col>
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


  export default {
    name: "PolicyAdd",
    components: {ArticleEditor},
    data(){
      return {
        policy:{
          levelType: 'country',
          title:''
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
        this.policy.content = this.$refs.editor.text();
        this.$http.post("policies",this.policy).then(res=>{
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
        this.policy.titlePhotoId = response;
        this.disable = true;
      },
      onRemove(){
        this.disable = false
      }
    }
  }
</script>

<style scoped>

</style>
