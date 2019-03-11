<template>
    <section class="container p-wrapper">
        <div>
            <el-button type="primary" size="small" @click="showDialog(false)">新增</el-button>
        </div>
        <div style="margin-top: 20px">
            <el-table
                :data="institutions"
            >
                <el-table-column type="index">
                </el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="类型" prop="type"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showDialog(scope.row)" round>编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)" round>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="infoDialog.title" :visible.sync="infoDialog.visible">
            <div class="dialog-container">
                <el-form :model="editInfo" size="small" label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-col :span="10">
                            <el-input v-model="editInfo.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="类型">
                        <template>
                            <el-select
                                    v-model= "editInfo.type"
                                    placeholder="类型选择"
                                    style="width: 80%;"
                            >
                                <el-option
                                        v-for="p in types"
                                        :label="p.name"
                                        :value="p.value"
                                        :key="p.value"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="商标">
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
            <span slot="footer">
                <el-button type="waring" @click="cancelDialog">取消</el-button>
                <el-button type="primary" @click="edit">提交</el-button>
            </span>
        </el-dialog>

    </section>
</template>

<script>
  import cof from '@/config/global'
  import util from '@/utils/common'
  export default {
    name: "InstitutionManager",
    data(){
      return {
        institutions:[],
        infoDialog: {
          visible:false,
          title:"",
          edit:false
        },
        editInfo:{},
        types:[
          {name:'银行',value:'1'},{name:'担保',value:'2'},{name:'保险',value:'3'},{name:'证券',value:'4'},
          {name:'基金',value:'5'},{name:'小贷',value:'6'},{name:'创投',value:'7'},{name:'保理',value:'8'},
          {name:'投资公司',value:'9'}
        ],
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
      loadData(){
        this.$http.get("public/institutions").then(res=>{
          this.institutions = res.data;
        });
      },
      edit(){
        this.$http.post('institutions',this.editInfo).then(res=>{
          this.$message.success("操作成功");
          this.cancelDialog();
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      deleteInfo(id){
        this.$confirm('确定要删除？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$http.delete("institutions/"+id).then(res=>{
            this.$message.success("删除成功");
            this.loadData();
          }).catch(reason => {
            if (!reason.handled){
              this.$message.error(reason.response.data.message);
            }
          })
        }).catch()
      },
      showDialog(row){
        if (row){
          //复制对象
          let role = util.clone(row);
          this.infoDialog.title = "编辑机构信息";
          this.infoDialog.edit = true;
          this.editInfo = role;
        } else {
          this.infoDialog.title = "添加合作机构";
          this.editInfo = {
            type: '1'
          }
        }
        this.infoDialog.visible = true;
      },
      cancelDialog(){
        this.infoDialog.visible = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(response,file,fileList){
        this.editInfo.brandId = response;
        this.disable = true;
      },
      onRemove(){
        this.disable = false
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
