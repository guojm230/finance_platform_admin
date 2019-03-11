<template>
    <section class="p-wrapper container">
        <div class="filter-area">
            <div style="width: 200px;" class="filter-item">
                <el-input
                        placeholder="请输入姓名"
                        prefix-icon="el-icon-search"
                        size="small"
                        v-model="filterValue.applierName"
                >
                </el-input>
            </div>

            <div style="width: 130px;" class="filter-item">
                <el-select
                        v-model="filterValue.status"
                        placeholder="状态"
                        size="small"
                        @change="onSelection"
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
            </div>
        </div>
        <div>
            <el-table
                    style="width: 100%;margin-top: 15px"
                    :data="tableData"
                    align="center"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="账号"></el-table-column>
                <el-table-column prop="applierName" label="姓名"></el-table-column>
                <el-table-column prop="verifyTime" label="申请时间"></el-table-column>
                <el-table-column prop="message" label="信息"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.stop="toDetail(scope.row.accountId)" round>
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
  export default {
    name: "UserVerify",
    data:function(){
      return {
        tableData:[],
        filterValue:{
          applierName: '',
          status: 0,
          pageNum: 0,
          pageSize: 10,
          total: 0
        },
      }
    },
    methods:{
      loadData(){
        this.$http.get("users/verifies", {
          params: this.filterValue
        }).then(res => {
          this.tableData = res.data.content;
          this.filterValue.total = res.data.totalElements;
        })
      },
      toDetail(id){
        this.$router.push({
          path:"/business/verify/detail/"+id
        })
      },
      onSelection(){
        this.loadData()
      },
      search(){
        this.loadData()
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
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
