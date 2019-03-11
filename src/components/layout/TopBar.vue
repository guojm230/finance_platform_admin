<template>
    <el-row>
        <el-col :span="8">
            <el-menu :default-active="this.$route.path"
                     mode="horizontal"
                     style="border-bottom: 0"
                     router>
                <el-col :span="8" class="brand">
                    <img src="@/assets/images/brand.jpg" class="brand-img"/>
                </el-col>
            </el-menu>
        </el-col>

        <el-col :span="16">
            <el-menu
                     mode="horizontal"
                     style="border-bottom: 0;float: right"
                     @select="onUserOperations"
                     >
                <el-submenu index="user-operation">
                    <template slot="title">{{name}}</template>
                    <el-menu-item index="logout">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    name: "TopBar",
    computed:{
      name(){
        let accountInfo = this.$sec.getAccountInfo();
        return accountInfo.name ? accountInfo.name : accountInfo.username;
      }
    },
    methods:{
      onUserOperations(index){
        if (index === 'logout'){
          this.$sec.logout();
          this.$router.push({name:"Login"})
        }
      }
    }
  }
</script>

<style scoped>

</style>
