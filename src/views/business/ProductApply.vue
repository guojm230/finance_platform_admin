<template>
    <section class="p-wrapper container">
        <div class="filter-area">
            <div class="filter-item">
                <el-form
                    label-position="left"
                    label-width="50px"
                >
                    <el-form-item label="类型">
                        <el-select
                                v-model="filterValue.status"
                                placeholder="状态"
                                size="small"
                                @change="loadData"
                        >
                            <el-option
                                    :value="0"
                                    label="待审批"
                            >
                            </el-option>
                            <el-option
                                    :value="-1"
                                    label="未通过"
                            >
                            </el-option>
                            <el-option
                                    :value="1"
                                    label="已通过"
                            >
                            </el-option>
                            <el-option
                                    :value="2"
                                    label="全部"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <!--table展示区-->
        <div>
            <el-table
                    style="width: 100%;margin-top: 15px"
                    :data="tableData"
                    align="center"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="applierName" label="申请人"></el-table-column>
                <el-table-column prop="productName" label="产品名称"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                <el-table-column prop="status" label="申请状态"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round @click="toDetail(scope.row.id)">
                            详情
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
    </section>
</template>

<script>
  import '@/assets/css/admin.css'
  import util from "@/utils/common"
  export default {
    name: "ProductApply",
    data:function(){
      return {
        tableData:[],
        filterValue:{
          status: 0,
          pageNum: 0,
          pageSize: 10,
          total: 0
        }
      }
    },
    methods:{
      loadData(){
        this.$http.get("products/admin/applies",{
          params:this.filterValue
        }).then(res=>{
          this.tableData = res.data.content;
          this.filterValue.total = res.data.totalElements;
        })
      },
      toDetail(id){
        this.$router.push({
          path:"/business/applies/detail/"+id,
        })
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
    }
  }
</script>

<style scoped>

</style>
