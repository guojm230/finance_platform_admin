<template>
    <section class="p-wrapper container">
        <!--总体数据展示区-->
        <div>
            <el-card
                    shadow="never"
                    class="item-card no-padding-card"
            >
                <header>
                    <h4>数据总和</h4>
                </header>
                <el-table
                    :data="statisticCount"
                >
                    <el-table-column label="注册企业数量" prop="registerCompanyCount">
                    </el-table-column>
                    <el-table-column label="需求总数" prop="demandCount">
                    </el-table-column>
                    <el-table-column label="需求总数金额" prop="demandMoney">
                    </el-table-column>
                    <el-table-column label="需求完成数量" prop="demandSuccessCount">
                    </el-table-column>
                    <el-table-column label="需求完成金额" prop="demandSuccessMoney">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <!--表格展示区-->
        <el-card
                shadow="never"
                class="item-card no-padding-card"
        >
            <header>
                <el-row>
                    <h4 style="float: left">数据编辑</h4>
                    <div style="float: right;margin: 1.33rem 0">
                        <transition name="el-fade-in">
                            <el-select v-show="type === 1"
                                       size="small"
                                       style="margin-right: 10px"
                                       v-model="city"
                                       @change="onSelectArea"
                            >
                                <el-option
                                    v-for="c in cities"
                                    :key="c.id"
                                    :value="c.id"
                                    :label="c.name"
                                >
                                </el-option>
                            </el-select>
                        </transition>
                        <el-select
                                v-model="type"
                                size="small"
                                @change="onSelectType"
                        >
                            <el-option
                                    :key="t.value"
                                    v-for="t in types"
                                    :label="t.name"
                                    :value="t.value"
                            ></el-option>
                        </el-select>
                        <el-button @click="saveData" type="primary" size="small" style="margin-left: 10px">保存</el-button>
                    </div>
                </el-row>
            </header>

            <el-table
                    :data="statistics"
                    @cell-click="onCellClick"
            >
                <el-table-column type="index">
                </el-table-column>
                <el-table-column :label="types[type-1].name" prop="name">
                </el-table-column>
                <el-table-column label="注册企业数量" prop="registerCompanyCount">
                    <template slot-scope="scope">
                        <el-input size="mini" :ref="scope.row.id+'registerCompanyCount'"
                                  v-if="scope.row.registerCompanyCountEdit"
                                  @blur.stop="onCellBlur(scope.row,scope.column)"
                                  v-model="scope.row.registerCompanyCount"></el-input>
                        <span v-show="!scope.row.registerCompanyCountEdit" >{{scope.row.registerCompanyCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="需求总数" prop="demandCount">
                    <template slot-scope="scope">
                        <el-input size="mini" :ref="scope.row.id+scope.column.property"
                                  v-if="scope.row[scope.column.property + 'Edit']"
                                  @blur.stop="onCellBlur(scope.row,scope.column)"
                                  v-model="scope.row.demandCount"></el-input>
                        <span v-show="!scope.row[scope.column.property + 'Edit']" >{{scope.row.demandCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="需求总数金额" prop="demandMoney">
                    <template slot-scope="scope">
                        <el-input size="mini" :ref="scope.row.id+scope.column.property"
                                  v-if="scope.row[scope.column.property + 'Edit']"
                                  @blur.stop="onCellBlur(scope.row,scope.column)"
                                  v-model="scope.row[scope.column.property]"></el-input>
                        <span v-show="!scope.row[scope.column.property + 'Edit']" >{{scope.row[scope.column.property]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="需求完成数量" prop="demandSuccessCount">
                    <template slot-scope="scope">
                        <el-input size="mini" :ref="scope.row.id+scope.column.property"
                                  v-if="scope.row[scope.column.property + 'Edit']"
                                  @blur.stop="onCellBlur(scope.row,scope.column)"
                                  v-model="scope.row[scope.column.property]"></el-input>
                        <span v-show="!scope.row[scope.column.property + 'Edit']" >{{scope.row[scope.column.property]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="需求完成金额" prop="demandSuccessMoney">
                    <template slot-scope="scope">
                        <el-input size="mini" :ref="scope.row.id+scope.column.property"
                                  v-if="scope.row[scope.column.property + 'Edit']"
                                  @blur.stop="onCellBlur(scope.row,scope.column)"
                                  v-model="scope.row.demandSuccessMoney"></el-input>
                        <span v-show="!scope.row[scope.column.property + 'Edit']" >{{scope.row.demandSuccessMoney}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </section>
</template>

<script>
  export default {
    name: "StatisticManager",
    data(){
      return {
        statisticCount:[],
        statistics:[],
        types:[{name:'地区',value:1},{name:'行业',value:2},{name:'担保',value:3}],
        type:1,
        city:410100,
        cities:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/statistic/count").then(res=>{
          this.statisticCount = [res.data];
        });
        this.$http.get("public/statistic?type=1&" +'pcode=410100').then(res=>{
          this.initData(res.data);
          this.statistics = res.data;
          this.loadArea();
        })
      },
      loadArea(){
        this.$http.get("public/commons/areas?pId=410000").then(res=>{
          this.cities = res.data;
        })
      },
      onSelectArea(){
        this.$http.get("public/statistic?type=1&" +'pcode='+this.city).then(res=>{
          this.statistics = res.data;
        })
      },
      onSelectType(){
        let pcode = 0;
        if (this.type === 1){
          pcode = this.city;
        }
        this.$http.get("public/statistic?type="+this.type+'&pcode='+pcode).then(res=>{
          this.initData(res.data);
          this.statistics = res.data;
        })
      },
      onCellClick(row,column){
        const prop = column.property;
        row[prop+'Edit'] = true;
        this.$nextTick(()=>{
          this.$refs[row.id+prop].focus();
        });

      },
      onCellBlur(row,column){
        const prop = column.property;
        row[prop+'Edit'] = false;
        row.showEdit = false;
      },
      initData(statsitics){
        statsitics.forEach(d=>{
          d.registerCompanyCountEdit = false;
          d.demandCountEdit = false;
          d.demandMoneyEdit = false;
          d.demandSuccessCountEdit = false;
          d.demandSuccessMoneyEdit = false;
        });
      },
      saveData(){
        this.$http.post("statistic",JSON.stringify(this.statistics),{
          headers:{
            'Content-Type':'application/json;charset=utf-8'
          }
        }).then(res=>{
          this.$message.success("修改成功");
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
