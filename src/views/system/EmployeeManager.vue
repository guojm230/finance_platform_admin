<template>
    <div class="p-wrapper">
        <div class="filter-area">
            <div style="width: 200px;" class="filter-item">
                <el-input
                        placeholder="请输入关键字"
                        prefix-icon="el-icon-search"
                        size="small"
                        v-model="searchValue"
                >
                </el-input>
            </div>

            <div style="width: 130px;" class="filter-item">
                <el-select
                        v-model="searchType"
                        placeholder="类型"
                        size="small"
                >
                    <el-option
                            v-for="op in searchOptions"
                            :key="op.value"
                            :label="op.label"
                            :value="op.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="width: 130px;" class="filter-item">
                <el-select
                        v-model="activeValue"
                        placeholder="状态"
                        size="small"
                        @change="onSelection"
                >
                    <el-option
                            value="-1"
                            label="全部"
                    >
                    </el-option>

                    <el-option
                            value="true"
                            label="启用"
                    >
                    </el-option>
                    <el-option
                            value="false"
                            label="禁用"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="filter-item">
                <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-search"
                        @click="search"
                >
                    搜索
                </el-button>
                <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-plus"
                        @click="showDialog(false)"
                >
                    新增
                </el-button>
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--size="small"-->
                        <!--icon="el-icon-download"-->

                <!--&gt;-->
                    <!--导出-->
                <!--</el-button>-->
            </div>
        </div>
        <!--table展示区-->
        <div>
            <el-table
                    style="width: 100%;margin-top: 15px"
                    :data="tableData"
                    align="center"
            >
                <el-table-column
                        type="selection"
                        width="30"
                        fixed="left"
                >
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="姓名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.telephone}}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="username" label="账户"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="email" label="电子邮箱"></el-table-column>
                <el-table-column prop="createTime" label="注册日期"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round
                                   @click="showDialog(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" size="small" round
                                   @click="deleteInfo(scope.row.id)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                    :page-size="filterValue.pageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="filterValue.total"
                    :current-page="filterValue.pageNum + 1"
                    align="center"
                    style="margin-top: 15px"
                    @prev-click="prevPage"
                    @next-click="nextPage"
                    @current-change="currentPage"
            >
            </el-pagination>
        </div>

        <!--员工信息编辑框-->
        <el-dialog title="编辑信息" :visible.sync="infoDialog.visible">
            <div class="dialog-container">
                <el-alert title="账户信息" type="info" :closable="false"></el-alert>
                <el-form :model="editInfo" :inline="true" size="small"
                         label-position="right" label-width="80px" >
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="账号">
                                <el-input v-model="editInfo.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="10">
                            <el-form-item label="密码">
                                <el-input v-model="editInfo.password"
                                          placeholder="设置新的密码"
                                          type="password">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="状态">
                        <el-radio-group v-model="editInfo.enabled">
                            <el-radio :label="true" >启用</el-radio>
                            <el-radio :label="false" >禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-alert title="员工信息" type="info" :closable="false"></el-alert>
                <el-form label-width="80px" label-position="right"
                         size="small"
                >
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="员工编号">
                                <el-input v-model="editInfo.id"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="姓名">
                                <el-input v-model="editInfo.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="10">
                            <el-form-item label="邮箱">
                                <el-input v-model="editInfo.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="性别">
                        <el-radio-group v-model="editInfo.sex" >
                            <el-radio label="男" >男</el-radio>
                            <el-radio label="女" >女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="联系电话">
                        <el-input v-model="editInfo.telephone"></el-input>
                    </el-form-item>
                </el-form>
                <el-alert title="权限信息" type="info" :closable="false"></el-alert>
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="角色">
                        <template>
                            <el-select
                                    v-model="editInfo.roleIds"
                                    multiple
                                    default-first-option
                                    placeholder="角色选择"
                                    style="width: 80%;"
                                    @focus="loadRoles"
                            >
                                <el-option
                                        v-for="role in roles"
                                        :label="role.alias"
                                        :value="role.id"
                                        :key="role.id"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button type="waring" @click="cancelDialog">取消</el-button>
                <el-button type="primary" @click="edit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import '@/assets/css/admin.css'
  import util from "@/utils/common"

  export default {
    name: "EmployeeManager",
    data:function () {
      return {
        tableData:[],
        searchOptions:[
          {
            value:"name",
            label:"姓名"
          },
          {
            value:"username",
            label:"用户名"
          },
          {
            value:"email",
            label:"邮箱"
          },
          {
            value:"telephone",
            label:"电话"
          }
        ],
        editInfo:{},
        searchValue:"",
        searchType:"name",
        activeValue:"",
        infoDialog: {
          visible:false,
          title:""
        },
        labelPosition:"right",
        roles:[],
        filterValue:{
          pageSize:10,
          pageNum:0,
          total:0
        }
      }
    },
    methods:{
      edit(){
        this.$http.post("employees", this.editInfo).then(res => {
          this.$message.success("操作成功");
          this.cancelDialog();
          this.loadData();
        }).catch(reason => {
          if (!reason.handled) {
            this.$message.error(reason.response.data.message);
          }
        })
      },
      loadData(){
        this.$http.get("employees",{
          params:this.filterValue
        }).then(res=>{
          const data = res.data.content;
          data.forEach(e=>{
            e.roleIds = e.roles.map(r=>r.id);
          });
          this.tableData = data;
          this.filterValue.total = res.data.totalElements;
        })
      },
      deleteInfo(id){
        this.$confirm('此操作将删除该员工的所有信息？','提示',{
          type:"warning"
        }).then(()=>{
          this.$http.delete("employees/"+id).then(()=>{
            this.$message.success("删除成功");
            this.loadData();
          }).catch(reason => {
            if (!reason.handled) {
              this.$message.error(reason.response.data.message)
            }
          })
        })
      },
      search(){
        if (this.searchValue){
          this.filterValue[this.searchType] = this.searchValue;
        }
        this.loadData()
      },
      onSelection(){
        if (this.activeValue !== '-1'){
          this.filterValue.enabled =this.activeValue;
        }else {
          this.filterValue.enabled = null;
        }
        this.loadData()
      },
      loadRoles(){
        this.$http.get("/roles").then(res=>{
          this.roles = res.data.content;
        })
      },
      showDialog(row){
        if (row){
          //复制对象
          let p = util.clone(row);
          this.infoDialog.title = "编辑员工信息";
          this.infoDialog.edit = true;
          this.editInfo = p;
        } else {
          this.infoDialog.title = "添加员工";
          this.editInfo = {
            roleIds:[]
          };
        }
        this.infoDialog.visible = true;
      },
      cancelDialog(){
        this.infoDialog.visible = false;
      },
      nextPage(){
        this.filterValue.pageNum += 1;
        this.loadData();
      },
      prevPage(){
        this.filterValue.pageNum -= 1;
        this.loadData();
      },
      currentPage(pageNum){
        this.filterValue.pageNum = pageNum - 1;
        this.loadData();
      }
    },
    mounted(){
      this.loadData();
      this.loadRoles();
    }
  }
</script>

<style scoped>
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .dialog-container {
        margin: auto;
        padding: 10px;
    }

    .el-alert{
        margin-bottom: 10px;
    }
</style>
