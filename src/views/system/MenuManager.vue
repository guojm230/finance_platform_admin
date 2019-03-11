<template>
    <div class="p-wrapper">
        <div class="filter-area">

            <div class="filter-item">
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
        <!--菜单列表区-->
        <div>
            <el-table
                    :data="showMenus"
                    style="width: 100%;"
                    @row-click="onRowClock"
                    :row-class-name="rowClassName"
            >
                <el-table-column  width="50px">
                    <template slot-scope="scope">
                        <i v-show="!(scope.row.leaf)" class="expand-icon"
                           :class="scope.row.isExpanded ? 'el-icon-arrow-down': 'el-icon-arrow-right'"></i>
                    </template>
                </el-table-column>
                <el-table-column label="名称">
                    <template slot-scope="scope">
                        <span v-for="i in scope.row.level" :key="i" class="tree-space"></span>
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNo" label="排序" align="center"></el-table-column>
                <el-table-column prop="url" label="地址" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.url ? scope.row.url : "-"}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="componentPath" label="组件路径" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.componentPath ? scope.row.componentPath : "-"}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round @click.stop="showDialog(scope.row)">编辑</el-button>
                        <el-button type="warning" size="small" round v-if="scope.row.enabled" @click.stop="disable(scope.row)" > 禁用</el-button>
                        <el-button type="success" size="small" round v-else @click.stop="enable(scope.row)" > 启用</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <el-dialog :title="infoDialog.title" :visible.sync="infoDialog.visible">
            <div class="dialog-">
                <el-form :model="editMenu" size="small" label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-col :span="10">
                            <el-input v-model="editMenu.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="链接">
                        <el-input :disabled="!editMenu.leaf" v-model="editMenu.url"></el-input>
                    </el-form-item>

                    <el-form-item label="组件">
                        <el-input :disabled="!editMenu.leaf" v-model="editMenu.componentPath"></el-input>
                    </el-form-item>

                    <el-form-item label="状态">
                        <el-radio-group v-model="editMenu.enabled">
                            <el-radio :label="true" >启用</el-radio>
                            <el-radio :label="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="可见性">
                        <el-radio-group v-model="editMenu.type">
                            <el-radio label="aside" >可见</el-radio>
                            <el-radio label="hidden">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-col :span="10">
                            <el-tooltip content="只影响同级菜单排序">
                                <el-input v-model="editMenu.orderNo"></el-input>
                            </el-tooltip>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="上级菜单">
                        <el-select
                            v-model="editMenu.pid"
                            default-first-option
                            placeholder="上级菜单"
                        >
                            <el-option
                                :value="0"
                                label="顶级菜单"
                            >

                            </el-option>
                            <el-option
                                v-for="menu in directoryMenus"
                                :key="menu.id"
                                :value="menu.id"
                                :label="menu.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="editMenu.description"></el-input>
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

  export default {
    name: "MenuManager",
    data:function () {
      return {
        originalMenus: [], //原始数据
        listMap: new Map(), //对菜单进行按照pid进行分组
        showMenus: [],
        editMenu: {},
        searchValue: "",
        infoDialog: {
          visible:false,
          title:"",
          edit:false
        }
      }
    },
    methods:{
      loadData() {
        this.$http.get("menus/all",{
          params: this.filterValue
        }).then(res => {
              this.originalMenus = res.data;
              this.refreshData();
        })
      },
      edit(){
        this.$http.post("menus",this.editMenu).then(res=>{
          this.$message.success("操作成功");
          this.cancelDialog();
          this.refreshData(true);
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      enable(row){
        this.$http.post("menus/enabled/"+row.id).then(()=>{
          this.updateStatusSuccess(row,true);
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.message);
          }
        })
      },
      disable(row){
        this.$http.post("menus/disabled/"+row.id).then(()=>{
          this.updateStatusSuccess(row,false);
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.message);
          }
        })
      },
      updateStatusSuccess(row,value){
        row.enabled = value;
        this.findAllSubMenus(row.id).forEach(menu=> menu.enabled = value)
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
      search(){
        this.loadData(this.searchValue);
      },
      showDialog(row){
        if (row){
          //复制对象
          let menu = util.clone(row);
          this.infoDialog.title = "编辑菜单信息";
          this.infoDialog.edit = true;
          this.editMenu = menu;
        } else {
          this.infoDialog.title = "编辑菜单信息";
          this.editMenu = this.emptyMenu();
        }
        this.infoDialog.visible = true;
      },
      cancelDialog(){
        this.infoDialog.visible = false;
      },
      onRowClock(row) {
        if (row.leaf) {
          return;
        }

        if (row.isExpanded) {
          row.isExpanded = false;

          const cMenuList = this.listMap.get(row.id);
          if (cMenuList && cMenuList.length > 0) {
            for (let i = 0; i < this.showMenus.length; i++) {
              for (let k = 0; k < cMenuList.length; k++) {
                if (this.showMenus[i].id === cMenuList[k].id) {
                  this.showMenus.splice(i, 1);
                  i--;
                  break;
                }
              }
            }
          }else {
            row.isExpanded = false;
            this.$set(this.showMenus,this.showMenus.indexOf(row),row);
          }
        } else {
          const cMenuList = this.listMap.get(row.id);
          const index = this.showMenus.indexOf(row);
          if (cMenuList && cMenuList.length > 0) {
            cMenuList.sort((m1, m2) => m1.orderNo - m2.orderNo);
            const bList = this.showMenus;
            this.showMenus = bList.slice(0, index + 1).concat(cMenuList)
                .concat(bList.slice(index + 1))

            row.isExpanded = true;
          }else {
            row.isExpanded = true;
            this.$set(this.showMenus,index,row);
          }
        }
      },
      refreshData(isReloadData) {
        if (isReloadData) {
          this.loadData();
          return;
        }

        this.showMenus = [];
        this.listMap = new Map();

        //按照父类id进行分组
        this.originalMenus.forEach(menu => {
          const existMenuList = this.listMap.get(menu.pid);
          if (!existMenuList) {
            this.listMap.set(menu.pid, [menu]);
          } else {
            existMenuList.push(menu);
          }

          menu.isExpanded = false;
          menu.leaf = (menu.url != null && menu.url.trim() != '');
        });

        this.showMenus = this.listMap.get(0).sort((menu1, menu2) => menu1.orderNo - menu2.orderNo);
      },
      rowClassName(scope){
        return scope.row.enabled ? '' : 'disable'
      },
      emptyMenu(){
        return {
          pid:0,
          enabled:true,
          orderNo:999,
          type:'aside',
          leaf:true
        }
      }
    },
    computed:{
      directoryMenus(){
        return this.originalMenus.filter(menu=>!menu.leaf)
      }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style scoped>
    .tree-space::before{
        content: "";
        display: inline-block;
        padding: 0 8px;
    }

    /*.expand-icon {*/
        /*position: absolute;*/
        /*left: 10px;*/
        /*line-height: 23px;*/
    /*}*/
</style>
