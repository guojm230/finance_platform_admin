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

            <div style="width: 130px;" class="filter-item">
                <el-select
                        v-model="filterValue.enabled"
                        placeholder="状态"
                        size="small"
                        @change="onSelection"
                >
                    <el-option
                            :value="null"
                            label="全部"
                    >
                    </el-option>

                    <el-option
                            :value="true"
                            label="上架中"
                    >
                    </el-option>
                    <el-option
                            :value="false"
                            label="已下架"
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
                        @click="toAdd()"
                >
                    添加商品
                </el-button>
                <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-download"
                        @click="deleteProducts"
                        :disabled="!delable"
                >
                    批量删除
                </el-button>
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--size="small"-->
                        <!--icon="el-icon-download"-->

                <!--&gt;-->
                    <!--导出数据-->
                <!--</el-button>-->
            </div>
        </div>
        <div>
            <el-table
                    style="width: 100%;margin-top: 15px"
                    :data="tableData"
                    @selection-change="onSelectionChange"
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
                            <el-form-item label="名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="publisherName" label="发布机构"></el-table-column>
                <el-table-column prop="createTime" label="创建日期"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round @click.stop="toEdit(scope.row.id)" >编辑</el-button>
                        <el-button type="warning" size="small" round @click="down(scope.row.id)" v-if="scope.row.enabled" >下架</el-button>
                        <el-button type="success" size="small" round v-else  @click="up(scope.row.id)" > 上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import "@/assets/css/admin.css"

  import {resolveStaticPath} from '@/utils/common'
  import qs from 'qs'

  export default {
    name: "ProductManager",
    data: function () {
      return {
        searchOptions: [],
        tableData: [],
        searchValue: "",
        searchType: "",
        activeValue:"",
        delable:false,
        delIds:[],
        filterValue:{
          name:'',
          type:'',
          period: '',
          guarantee:'',
          loanLimit:'',
          orderCount:'desc',
          enabled: null,
          orderRate:'',
          pageNum:0,
          pageSize:10,
          total:0
        }
      }
    },
    methods: {
      loadData() {
        this.$http.get("admin/simple-products",{
          params: this.filterValue
        }).then(res=>{
          this.filterValue.total = res.data.totalElements;
          this.tableData = res.data.content;
          this.tableData.forEach(p=> p.brandPath = resolveStaticPath(p.brandPath))
        })
      },
      onSelection() {
        this.loadData();
      },
      search(){
        this.loadData();
      },
      up(id){
        this.$http.post("products/up",{id:id}).then(res=>{
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      down(id){
        this.$http.post("products/down",{id:id}).then(res=>{
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      toAdd(){
        this.$router.push("/products/add");
      },
      toEdit(id){
        this.$router.push({
          path:"/products/edit/"+id,
        });
      },
      deleteProducts(){
        this.$http.delete("products",{
          params:{
            ids:this.delIds
          },
          paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          }
        }).then(res=>{
          this.$message.success("删除成功");
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      onSelectionChange(sel){
        if (sel.length > 0){
          this.delable = true;
          this.delIds = sel.map(p=>p.id);
        } else{
          this.delable = false;
        }
      }
    },
    mounted: function () {
      this.loadData();
    }
  }
</script>
