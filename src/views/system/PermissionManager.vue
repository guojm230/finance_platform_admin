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
                <el-table-column prop="createTime" label="创建日期"></el-table-column>
                <el-table-column label="操作">
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

        <el-dialog :title="infoDialog.title" :visible.sync="infoDialog.visible">
            <div class="dialog-container">
                <el-form :model="editInfo" size="small" label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-col :span="10">
                            <el-input v-model="editInfo.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="别名">
                        <el-col :span="10">
                            <el-input v-model="editInfo.alias"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" :rows="3" v-model="editInfo.description"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单">
                        <template>
                            <el-select
                                    v-model="menuIds"
                                    multiple
                                    placeholder="菜单选择"
                                    style="width: 80%;"
                                    @change="onSelectMenus"
                            >
                                <el-option
                                        v-for="item in menus"
                                        :label="item.name"
                                        :value="item.id"
                                        :key="item.id"
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
    name: "PermissionManager",
    data:function () {
      return {
        tableData:[],
        searchValue: "",
        editInfo:{},
        infoDialog: {
          visible:false,
          title:"",
          edit:false
        },
        menus:[],
        menuIds:[],
        listMap:new Map(),
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
        this.$http.get("permissions",{
          params: this.filterValue
        }).then(res=>{
          const permissions = res.data.content;

          permissions.forEach(p=>{
            p.menuIds = p.menus.map(m=>m.id)
          });
          this.tableData = permissions;
          this.filterValue.total = res.data.totalElements;
        })
      },
      loadMenus(){
        this.$http.get("/menus/all").then(res=>{
          this.menus = res.data;

          //按照父类id进行分组
          this.menus.forEach(menu => {
            const existMenuList = this.listMap.get(menu.pid);
            if (!existMenuList) {
              this.listMap.set(menu.pid, [menu]);
            } else {
              existMenuList.push(menu);
            }

            menu.leaf = (menu.url != null && menu.url.trim() != '');
          });
        })
      },
      onSelectMenus(val){
        //增加
        let newVal;
        if (val.length > this.editInfo.menuIds.length) {
          //新增
          newVal = val[val.length-1];

          let subMenus = this.listMap.get(newVal);
          //叶子菜单
          if (!subMenus){
            let menu = this.findMenusById(newVal);
            if (val.indexOf(menu.pid) === -1){
              val.push(menu.pid);
            }
          } else {//子菜单也添加进去
            subMenus.forEach(menu=>{
              if (this.menuIds.indexOf(menu.id) === -1){
                val.push(menu.id);
              }
            })
          }
        }else{
          this.editInfo.menuIds.forEach(id=>{
            if (this.menuIds.indexOf(id) === -1){
              newVal = id;
              return false;
            }
          });
          let subMenus = this.listMap.get(newVal);
          console.log(JSON.stringify(this.listMap));
          if (subMenus) {
            subMenus.forEach(menu => {
              let index = val.indexOf(menu.id);
              if (index !== -1) {
                val.splice(index, 1);
              }
            })
          }
        }
        this.editInfo.menuIds = this.menuIds;
      },
      findMenusById(id){
        let result;
        this.menus.forEach(m=>{
          if (m.id === id) {
            result = m;
            return false;
          }
        });
        return result;
      },
      findAllSubMenus(id){
        let menus = [];
        let cmenus = this.listMap.get(id);

        if (cmenus && cmenus.length > 0){
          menus = menus.concat(cmenus);
          cmenus.forEach(menu=>{
            if (!menu.leaf){
              menus = menus.concat(this.findAllSubMenus(menu.id))
            }
          })
        }
        return menus;
      },
      edit(){
        this.$http.post("permissions", this.editInfo).then(res => {
          this.$message.success("操作成功");
          this.cancelDialog();
          this.loadData();
        }).catch(reason => {
          if (!reason.handled) {
            this.$message.error(reason.response.data.message);
          }
        })
      },
      deleteInfo(id){
        this.$confirm('删除该角色？','提示',{
          type:"warning"
        }).then(()=> {
          this.$http.delete("permissions/" + id).then(res => {
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
        this.loadData(this.searchValue);
      },
      showDialog(row){
        if (row){
          //复制对象
          let p = util.clone(row);
          this.infoDialog.title = "编辑权限信息";
          this.infoDialog.edit = true;
          this.editInfo = p;
        } else {
          this.infoDialog.title = "添加权限";
          this.editInfo = {
            menuIds:[]
          };
        }
        this.menuIds = this.editInfo.menuIds;
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
    mounted:function () {
      this.loadData();
      this.loadMenus();
    }
  }
</script>

<style scoped>

</style>
