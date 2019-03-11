<template>
    <div class="root">
      <el-row class="msg">
        <h1><i style="color: #009688;font-size: 250px;">404</i></h1>
      </el-row>
      <el-row class="link-area">
        <a class="link" @click="goBack" href="javascript:;">
          返回上一级
        </a>
        <router-link class="link" to="/">返回首页</router-link>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "NotFoundComponent",
      methods:{
        goBack(){
          window.history.length >1 ?
            this.$router.go(-2) : this.$router.push("/");
        }
      }
    }
</script>

<style scoped>
  .root{
    padding: 0 10%;
    height: 100%;
  }

  .msg{
    text-align: center;
  }

  .link-area{
    text-align: center;
  }

</style>
