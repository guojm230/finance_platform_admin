<template>
    <!--支持三级查询-->
    <div class="area-select">
        <el-select
                :disabled="pDisable"
        >
            <el-option
                v-for="p in provinces"
                :key="p.id"
            >

            </el-option>
        </el-select>
        <el-select
            :disabled="cDisable"
        >

        </el-select>
        <el-select
            :disabled="aDisable"
        >

        </el-select>
    </div>
</template>

<script>
  export default {
    name: "AreaSelector",
    data:function(){
      return {
        provinces:[],
        cities:[],
        areas:[],
        pDisable:false,
        cDisable:true,
        aDisable:true
      }
    },
    methods:{
      loadData(pId){
        let param = {};
        if (pId){
          param.pId = pId
        }
        this.$http.get("public/commons/areas",{params:param}).then(res=>{

        })
      }
    }
  }
</script>

<style scoped>
    .area-select{

    }
</style>
