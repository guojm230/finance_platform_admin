<template>
    <div class="p-wrapper container">
        <!--填写内容区-->
        <section style="margin-top: 15px">
            <el-card
                shadow="never"
                style="padding: 0 15px"
            >
                <div slot="header">
                    <span>商品属性</span>
                </div>
                <el-form label-position="left" label-width="100px"
                         ref="ruleForm"
                         :rules="rules"
                         :model="product"
                >
                    <el-form-item label="商品名称" prop="name">
                        <el-col :span="10">
                        <el-input v-model="product.name"></el-input>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="还款方式" prop="repaymentMode">
                        <el-col :span="10">
                            <el-input v-model="product.repaymentMode"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="担保方式" prop="guaranteeMode">
                        <el-col :span="10">
                            <el-select
                                v-model="product.guaranteeMode"
                                placeholder="请选择担保方式"
                            >
                                <el-option
                                    v-for="g in guarantees"
                                    :key = "g.id"
                                    :label="g.itemName"
                                    :value="g.itemValue"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="贷款金额" required>
                        <el-col :span="4">
                            <el-input v-model="product.loanLimitMin" prop="loanLimitMin" placeholder="万元"></el-input>
                        </el-col>
                        <el-col :span="1"
                                style="text-align: center;max-width: 20px"
                        >
                            -
                        </el-col>
                        <el-col :span="4">
                            <el-input v-model="product.loanLimitMax" prop="loanLimitMin" placeholder="万元"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="贷款利率" required>
                        <el-col :span="4">
                            <el-input v-model="product.rateRangeMin" prop="rateRangeMin" placeholder="百分比"></el-input>
                        </el-col>
                        <el-col :span="1"
                                style="text-align: center;max-width: 20px"
                        >
                            -
                        </el-col>
                        <el-col :span="4">
                            <el-input v-model="product.rateRangeMax" prop="rateRangeMax" placeholder="百分比"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <span style="font-size: 12px;color: #6c757d !important;padding-left: 5px">最高精确到小数点后四位</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="贷款期限" required>
                        <el-col :span="4">
                            <el-input v-model="product.creditPeriodMin" prop="creditPeriodMin" placeholder="月"></el-input>
                        </el-col>
                        <el-col :span="1"
                                style="text-align: center;max-width: 20px"
                        >
                            -
                        </el-col>
                        <el-col :span="4">
                            <el-input v-model="product.creditPeriodMax" prop="creditPeriodMax" placeholder="月"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="适用客户"  prop="applicableCustomers">
                        <el-input type="textarea" autosize  v-model="product.applicableCustomers"></el-input>
                    </el-form-item>
                    <el-form-item label="申请要求" prop="applyRequirements">
                        <el-input type="textarea" autosize v-model="product.applyRequirements"></el-input>
                    </el-form-item>
                    <el-form-item label="提交材料" prop="submissions">
                        <el-input type="textarea" autosize v-model="product.submissions"></el-input>
                    </el-form-item>
                    <el-form-item label="申请流程" prop="applyWorkflow">
                        <el-input type="textarea" autosize v-model="product.applyWorkflow"></el-input>
                    </el-form-item>
                    <el-form-item label="产品简介" prop="introduce">
                        <el-input type="textarea" autosize v-model="product.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="申请次数">
                        <el-input type="number" :min="0" v-model="product.applyCount"></el-input>
                    </el-form-item>
                    <el-form-item label="成功次数">
                        <el-input type="number" :min="0" :max="product.applyCount" v-model="product.successCount"> </el-input>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card class="item-card" style="margin-top: 15px"
                shadow="never"
            >
                <div slot="header">
                    <span>发布者信息</span>
                </div>
                <el-form
                        label-position="right"
                        label-width="100px"
                    :model="product"
                    :rules="rules"
                >
                    <el-form-item label="联系电话" prop="telephone">
                        <el-input v-model="product.telephone"></el-input>
                    </el-form-item>

                    <el-form-item label="发布机构">
                        <el-input v-model="institution.name" :disabled="true"></el-input>
                        <div>
                            <el-tabs v-model="insType">
                                <el-tab-pane label="银行" name="bank">
                                    <el-row
                                        :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('银行')" :key="i.id"
                                            style="margin-top: 15px"
                                        >
                                            <el-card
                                                shadow="never"
                                                align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)" class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="担保" name="guarantee">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('担保')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never"
                                                    align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="保险" name="insurance">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('保险')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never" align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="证券" name="securities">
                                    <el-row :gutter="20">
                                        <el-col :span="6" v-for="i in listMap.get('证券')" :key="i.id"
                                                style="margin-top: 15px">
                                            <el-card align="center"
                                                    shadow="never">
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="基金" name="foundation">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('基金')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never" align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="小贷" name="microCredit">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('小贷')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never" align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="创投" name="venture">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('创投')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never" align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="保理" name="factor">
                                    <el-row
                                            :gutter="20"
                                    >
                                        <el-col :span="6" v-for="i in listMap.get('保理')" :key="i.id"
                                                style="margin-top: 15px"
                                        >
                                            <el-card
                                                    shadow="never" align="center"
                                            >
                                                <div>
                                                    <img :src="i.brandPath" @click="selectInstitution(i)"  class="ins-img"/>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="投资公司" name="investment"><el-row
                                        :gutter="20"
                                >
                                    <el-col :span="6" v-for="i in listMap.get('投资公司')" :key="i.id"
                                            style="margin-top: 15px"
                                    >
                                        <el-card
                                                shadow="never" align="center"
                                        >
                                            <div>
                                                <img :src="i.brandPath" @click="selectInstitution(i)"
                                                     style="width: 100px;height: 40px"
                                                />
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row></el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-form-item>
                </el-form>
            </el-card>

            <div style="margin-top: 20px;text-align: center" >
                <div style="margin-bottom: 15px">
                    <el-button style="width: 80%" type="primary" @click="commit">提交</el-button>
                </div>
                <div>
                    <el-button type="warning" style="width: 80%" @click="back" >返回</el-button>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
  import {resolveStaticPath} from '@/utils/common'

  export default {
    name: "ProductAdd",
    data:function () {
      return {
        product:{
          successCount:0,
          applyCount:0
        },
        rules:{
          name:[{required:true,message:"产品名称不能为空",trigger:"blur"}],
          repaymentMode:[{required:true,message:"还款方式不能为空",trigger:"blur"}],
          guaranteeMode:[{required:true,message:"担保方式不能为空",trigger:"blur"}],
          mortgageMode:[{required:true,message:"抵押方式不能为空",trigger:"blur"}],
          loanLimitMin:[{required:true,message:"贷款额度不能为空",trigger:"blur"}],
          loanLimitMax:[{required:true,message:"贷款额度不能为空",trigger:"blur"}],
          rateRangeMin:[{required:true,message:"贷款利率不能为空",trigger:"blur"}],
          rateRangeMax:[{required:true,message:"贷款利率不能为空",trigger:"blur"}],
          creditPeriodMin:[{required:true,message:"贷款期限不能为空",trigger:"blur"}],
          creditPeriodMax:[{required:true,message:"贷款期限不能为空",trigger:"blur"}],
          applicableCustomers:[{required:true,message:"适用客户不能为空",trigger:"blur"}],
          applyRequirements:[{required:true,message:"申请要求不能为空",trigger:"blur"}],
          submissions:[{required:true,message:"提交材料不能为空",trigger:"blur"}],
          applyWorkflow:[{required:true,message:"申请流程不能为空",trigger:"blur"}],
          introduce:[{required:true,message:"产品简介不能为空",trigger:"blur"}],
          telephone:[{required:true,message:"联系电话不能为空",trigger:"blur"}]
        },
        insType:"bank",
        bankImages:[''],
        institutions:[],
        institution:{},
        guarantees:[],
        listMap:new Map()
      };
    },
    methods:{
      loadProduct(){
        const id = this.$route.params.id;
        if (id){
          this.$http.get("products/"+id).then(res=>{
            res.data.applyRequirements = this.recoverHtml(res.data.applyRequirements);
            res.data.submissions = this.recoverHtml(res.data.submissions);
            res.data.applyWorkflow = this.recoverHtml(res.data.applyWorkflow);
            res.data.introduce = this.recoverHtml(res.data.introduce);
            res.data.applicableCustomers = this.recoverHtml(res.data.applicableCustomers);

            this.product = res.data;
            this.institution = res.data.institution;
          })
        }
      },
      loadInstitutions(){
        this.$http.get("public/institutions").then(res=>{
          this.institutions = res.data;
          let map = new Map();
          this.institutions.forEach(ins=>{
            ins.brandPath = resolveStaticPath(ins.brandPath);
            const existIns = map.get(ins.type);
            if (!existIns){
              map.set(ins.type,[ins])
            } else {
              existIns.push(ins);
            }
          });
          this.listMap = map;
        })
      },
      loadGuaranteeMode(){
        this.$http.get("public/commons/guarantee").then(res=>{
          this.guarantees = res.data;
        })
      },
      commit(){
        this.product.applyRequirements = this.resolveText(this.product.applyRequirements);
        this.product.submissions = this.resolveText(this.product.submissions);
        this.product.applyWorkflow = this.resolveText(this.product.applyWorkflow);
        this.product.introduce = this.resolveText(this.product.introduce);
        this.product.applicableCustomers = this.resolveText(this.product.applicableCustomers);

        this.$http.post("products",this.product).then(res=>{
          this.$message.success("操作成功");
          this.$router.back();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      selectInstitution(ins){
        this.institution = ins;
        this.product.publisherId = ins.id;
      },
      back(){
        this.$router.back();
      },
      resolveText(strValue){
        if (!strValue){
          return ''
        }
        return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
      },
      recoverHtml(strValue){
        if (!strValue){
          return ''
        }
        const reg = new RegExp("<br/>",'g');
        return strValue.replace(reg,'\r\n');
      }
    },
    mounted:function () {
      this.loadProduct();
      this.loadGuaranteeMode();
      this.loadInstitutions();
    }
  }
</script>

<style scoped>

</style>
