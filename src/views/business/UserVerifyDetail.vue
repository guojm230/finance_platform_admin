<template>
    <section class="p-wrapper container">
        <el-card
                class="item-card no-padding-card"
                shadow="never"
        >
            <header class="item-card-header">
                <h3 class="item-card-title">企业信息</h3>
            </header>
            <el-row class="info-table">
                <!--头部-->
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>企业名称：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.companyName}}
                    </el-col>
                    <el-col :span="4" class=" list-title">
                        <span>统一信用代码：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.socialCreditCode}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>法人证件号：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.credentialNumber}}
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>法人手机：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{company.legalTelephone}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>对公银行账号：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.bankAccount}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>开户行：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.openingBank}}
                    </el-col>
                </el-row>

                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>开户支行：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.branchOpeningBank}}
                    </el-col>
                </el-row>

                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>行业分类：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.industry}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>企业位置：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.position}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>企业简介：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.introduce}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>经营范围：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        {{company.businessScope}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>营业执照：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        <div class="preview-photo" :style="{
                            backgroundImage: 'url('+company.businessLicencePath +')',
                            backgroundSize: '100% 100%'
                        }">
                            <div class="shade" @click="handlePictureCardPreview(company.businessLicencePath)">
                                <i class="el-icon-zoom-in shade-icon"></i>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>法人代表身份证：</span>
                    </el-col>
                    <el-col :span="16" class="">
                        <div class="preview-photo" :style="{
                            backgroundImage: 'url('+company.legalRepresentativePath1 +')',
                            backgroundSize: '100% 100%'
                        }">
                            <div class="shade" @click="handlePictureCardPreview(company.legalRepresentativePath1)">
                                <i class="el-icon-zoom-in shade-icon"></i>
                            </div>
                        </div>
                        <div class="preview-photo" v-if="company.legalRepresentativePath2"
                             :style="{
                            backgroundImage: 'url('+company.legalRepresentativePath2 +')',
                            backgroundSize: '100% 100%'
                        }">
                            <div class="shade" @click="handlePictureCardPreview(company.legalRepresentativePath2)">
                                <i class="el-icon-zoom-in shade-icon"></i>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title " >
                        <span>采集信息授权证书：</span>
                    </el-col>
                    <el-col :span="16">
                        <div class="preview-photo" :style="{
                            backgroundImage: 'url('+company.certificateAuthorizationPath +')',
                            backgroundSize: '100% 100%'
                        }">
                            <div class="shade" @click="handlePictureCardPreview(company.certificateAuthorizationPath)">
                                <i class="el-icon-zoom-in shade-icon"></i>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </el-card>

        <el-card
                class="item-card no-padding-card"
                shadow="never"
        >
            <header class="item-card-header">
                <h3 class="item-card-title">用户信息</h3>
            </header>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>姓名：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.name}}
                </el-col>
            </el-row>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>身份证号：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.identityNumber}}
                </el-col>
            </el-row>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>联系手机：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.telephone}}
                </el-col>
            </el-row>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>电子邮箱：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.email}}
                </el-col>
            </el-row>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>固定电话：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.phone}}
                </el-col>
            </el-row>
            <el-row class="info-table">
                <el-col :span="4" class="list-title">
                    <span>公司职务：</span>
                </el-col>
                <el-col :span="16" class="">
                    {{userInfo.companyPosition}}
                </el-col>
            </el-row>
        </el-card>

        <div style="margin-top: 20px;text-align: center">
            <template v-if="applyInfo.status === 0">
                <div style="margin-bottom: 15px">
                    <el-button type="primary" style="width: 80%" round @click="success(1)">通过</el-button>
                </div>
                <div style="margin-bottom: 15px">
                    <el-button type="danger" style="width: 80%" @click="finish(-1)" round>驳回</el-button>
                </div>
            </template>
            <div>
                <el-button type="warning" style="width: 80%" round @click="back">返回</el-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </section>
</template>

<script>
    import {resolveStaticPath} from '@/utils/common'
  export default {
    name: "UserVerifyDetail",
    data:function () {
      return {
        company:{},
        userInfo:{},
        applyInfo:{},
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    methods:{
      loadData(){
        this.$http.get("users/account/"+this.$route.params.id).then(res=>{
          this.userInfo = res.data;
          this.company = res.data.company;
          this.company.businessLicencePath = resolveStaticPath(this.company.businessLicencePath);
          this.company.legalRepresentativePath1 = resolveStaticPath(this.company.legalRepresentativePath1);
          if (this.company.legalRepresentativePath2){
            this.company.legalRepresentativePath2 = resolveStaticPath(this.company.legalRepresentativePath2);
          }
          this.company.certificateAuthorizationPath = resolveStaticPath(this.company.certificateAuthorizationPath);

          this.$http.get("users/verifies/"+this.userInfo.accountId+"/last")
              .then(res=>{
                this.applyInfo = res.data;
              })
        })
      },
      success(msg){
        this.$http.post("applies/success",{
          id:this.applyInfo.id,
          message: msg
        }).then(res=>{
          this.$message.success("操作成功");
          this.back();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      reject(msg){
        this.$http.post("applies/failure",{
          id:this.applyInfo.id,
          message: msg
        }).then(res=>{
          this.$message.success("操作成功");
          this.back();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      finish(status){
        this.$prompt('请输入消息(可选)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (status === 1){
            this.success(value);
          } else {
            this.reject(value);
          }
        }).catch(() => {

        });
      },
      handlePictureCardPreview(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
      },
      back(){
        this.$router.back();
      }
    },
    mounted:function () {
      this.loadData();
    }
  }
</script>

<style scoped>
    .preview-photo:hover{
        background-color: #1b1e21;
    }

    .shade{
        position: absolute;
        width: 150px;
        height:150px;
        z-index: 1000;
        opacity: 0;
        background-color: #1b1e21
    }

    .shade:hover{
        opacity: 0.7;
    }

    .shade{
        transition: all ease-in .3s;
        -webkit-transition: all ease-in .3s;
        -moz-transition: all ease-in .3s;
    }

    .shade-icon{
        color: #ffffff;
        top: 45%;
        right: 45%;
        font-size: 1.3rem;
        position: absolute
    }

    .preview-photo{
        width: 150px;
        height: 150px;
        z-index: 100;
    }
</style>
