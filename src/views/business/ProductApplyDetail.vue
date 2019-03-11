<template>
    <section class="container p-wrapper">
        <!--申请人信息-->
        <el-card
            class="item-card no-padding-card"
            shadow="never"
        >
            <header class="item-card-header">
                <h3 class="item-card-title">申请人信息</h3>
            </header>
            <el-row class="info-table">
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>姓名：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{userInfo.name}}
                    </el-col>
                    <el-col :span="4" class=" list-title">
                        <span>身份证号：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{userInfo.identityNumber}}
                    </el-col>
                </el-row>
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>联系电话：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{userInfo.telephone}}
                    </el-col>
                    <el-col :span="4" class=" list-title">
                        <span>邮箱：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{userInfo.email}}
                    </el-col>
                </el-row>
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>公司职务：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{userInfo.companyPosition}}
                    </el-col>
                </el-row>
            </el-row>
        </el-card>

        <el-card
                class="item-card no-padding-card"
                shadow="never"
        >
            <header class="item-card-header">
                <h3 class="item-card-title">产品信息</h3>
            </header>
            <el-row class="info-table">
                <!--头部-->
                <el-row style="margin-bottom: 20px">
                    <img style="width: 124px;height: 46px;display: inline-block" :src="product.brandPath" :alt="product.publisherName"/>
                    <div style="margin-left: 20px;display: inline-block">
                        <h3>{{product.name}}</h3>
                        <span>发布机构：</span> {{product.publisherName}}
                    </div>
                </el-row>
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>参考利率范围：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{product.rateRangeMin}}% ~ {{product.rateRangeMax}}%
                    </el-col>
                    <el-col :span="4" class=" list-title">
                        <span>还款方式：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{product.repaymentMode}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>贷款额度：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{product.loanLimitMin}}万元 ~ {{product.loanLimitMax}}万元
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>贷款期限：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{product.creditPeriodMin}}个月 ~ {{product.creditPeriodMax}}个月
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>担保方式：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{product.guaranteeMode}}
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>联系电话：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{product.telephone}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>贷款额度：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{product.loanLimitMin}}万元 ~ {{product.loanLimitMax}}万元
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>贷款期限：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{product.creditPeriodMin}}个月 ~ {{product.creditPeriodMax}}个月
                    </el-col>
                </el-row>

                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>产品简介：</span>
                    </el-col>
                    <el-col :span="20" class="col-10" v-html="product.introduce">
                    </el-col>
                </el-row>
                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>适用客户：</span>
                    </el-col>
                    <el-col :span="20" class="col-10" v-html="product.applicableCustomers">
                    </el-col>
                </el-row>
                <el-row class=" list-item">
                    <el-col :span="4" class="list-title">
                        <span>申请条件：</span>
                    </el-col>
                    <el-col :span="20" class="col-10" v-html="product.applyRequirements">
                    </el-col>
                </el-row>
                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>提交材料：</span>
                    </el-col>
                    <el-col :span="20" class="col-10" v-html="product.submissions">
                    </el-col>
                </el-row>

                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>申请流程：</span>
                    </el-col>
                    <el-col :span="20" class="col-10" v-html="product.applyWorkflow">
                    </el-col>
                </el-row>
            </el-row>
        </el-card>

        <div style="margin-top: 20px">
            <template v-if="applyInfo.status === 0">
                <div style="text-align: center">
                    <el-button type="primary" style="width: 80%;margin-bottom: 5px" round @click="finish(1)" >完成</el-button>
                </div>

                <div style="text-align: center">
                    <el-button type="danger" style="width: 80%;margin-bottom: 5px" round @click="finish(-1)" >拒绝</el-button>
                </div>
            </template>

            <div style="text-align: center" v-else>
                <el-button type="info" style="width: 80%;margin-bottom: 5px" round disabled >
                    {{applyInfo.status === 1 ? '已完成' : '未完成'}}
                </el-button>
            </div>

            <div style="text-align: center">
                <el-button type="warning" style="width: 80%;margin-bottom: 5px" round @click="back" >返回</el-button>
            </div>

        </div>
    </section>
</template>

<script>

  import {resolveStaticPath} from '@/utils/common'

  export default {
    name: "ProductApplyDetail",
    data:function () {
      return {
        userInfo:{},
        product:{},
        applyInfo:{}
      }
    },
    methods:{
      loadData(){
        this.$http.get("products/applies/"+this.$route.params.id).then(res=>{
          this.applyInfo = res.data;
          this.loadUserInfo();
          this.loadProductInfo()
        })
      },
      loadUserInfo(){
        this.$http.get("users/account/"+this.applyInfo.applierId).then(res=>{
          this.userInfo = res.data;
        })
      },
      loadProductInfo(){
        this.$http.get("public/products/"+this.applyInfo.productId+"?accountId="+this.applyInfo.applierId).then(res=>{
          this.product = res.data;
          this.product.brandPath = resolveStaticPath(res.data.brandPath);
        })
      },
      success(msg){
        this.$http.post("products/applies/success",{
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
        this.$http.post("products/applies/failure",{
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
            this.success(value)
          } else {
            this.reject(value)
          }
        }).catch(() => {
        });
      },
      back(){
        this.$router.back()
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
