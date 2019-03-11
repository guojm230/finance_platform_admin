<template>
    <div class="p-wrapper">
        <div class="filter-area">
            <div style="width: 200px;" class="filter-item">
                <el-input
                        placeholder="请输入关键字"
                        prefix-icon="el-icon-search"
                        size="small"
                        v-model="filterValue.name"
                >
                </el-input>
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
            </div>
        </div>
        <div>
            <el-table
                    style="width: 100%;margin-top: 15px"
                    :data="tableData"
            >
                <el-table-column
                        type="selection"
                        width="30"
                        fixed="left"
                >
                </el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="alias" label="别名"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round
                                   @click.stop="showDialog(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" size="small" round
                                   @click.stop="deleteRole(scope.row.id)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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

        <el-dialog :title="infoDialog.title" :visible.sync="infoDialog.visible">
            <div class="dialog-container">
                <el-form :model="editRole" size="small" label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-col :span="10">
                            <el-input v-model="editRole.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="别名">
                        <el-col :span="10">
                            <el-input v-model="editRole.alias"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" :rows="3" v-model="editRole.description"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <template>
                            <el-select
                                    v-model= "editRole.permissionIds"
                                    multiple
                                    placeholder="权限选择"
                                    style="width: 80%;"
                            >
                                <el-option
                                        v-for="p in permissions"
                                        :label="p.alias"
                                        :value="p.id"
                                        :key="p.id"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button type="waring" @click="cancelDialog">取消</el-button>
                <el-button type="primary" @click="edit">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import '@/assets/css/admin.css'
  import util from "@/utils/common"

  let pageNum = 0;
  let pageSize = 10;
  export default {
    name: "RoleManager",
    data:function () {
      return {
        tableData:[],
        editRole:{},
        permissions:[],
        infoDialog: {
          visible:false,
          title:"",
          edit:false
        },
        filterValue:{
          name:'',
          pageSize:10,
          pageNum:0,
          total:0
        }
      }
    },
    methods:{
      loadData(){
        this.$http.get("roles",{
          params: this.filterValue
        }).then(res=>{
          const data = res.data.content;
          data.forEach(p=>{
            p.permissionIds = p.permissions.map(m=>m.id);
          });
          this.tableData = data;
          this.filterValue.total = res.data.totalElements;
        })
      },
      loadPermissions(){
        if (this.permissions.length === 0){
          this.$http.get("permissions/all").then(res=>{
            this.permissions = res.data;
          })
        }
      },
      edit(){
        this.$http.post("roles", this.editRole).then(res => {
          this.$message.success("操作成功");
          this.cancelDialog();
          this.loadData();
        }).catch(reason => {
          if (!reason.handled) {
            this.$message.error(reason.response.data.message);
          }
        })
      },
      deleteRole(id){
        this.$confirm('删除该角色？','提示',{
          type:"warning"
        }).then(()=>{
          this.$http.delete("roles/"+id).then(()=>{
            this.$message.success("删除成功");
            this.loadData(this.searchValue);
          }).catch(reason => {
            if (!reason.handled) {
              this.$message.error(reason.response.data.message)
            }
          })
        })
      },
      search(){
        this.loadData()
      },
      showDialog(row){
        if (row){
          //复制对象
          let role = util.clone(row);
          this.infoDialog.title = "编辑角色信息";
          this.infoDialog.edit = true;
          this.editRole = role;
        } else {
          this.infoDialog.title = "添加角色";
          this.editRole = this.emptyRole();
        }
        this.infoDialog.visible = true;
      },
      cancelDialog(){
        this.infoDialog.visible = false;
      },
      emptyRole(){
        return {
          permissionIds: []
        }
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
    mounted:function () {
      this.loadData();
      this.loadPermissions();
    }
  }
</script>

<style scoped>

</style>
