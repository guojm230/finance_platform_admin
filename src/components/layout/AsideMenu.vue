<template>
    <el-aside width="220px">
        <el-scrollbar :native="false"
                      :noresize="true"
                      class="c-scrollbar"
        >
            <el-row class="menu-row">
            <el-col class="menu-wrapper" style="margin-top: 20px">
                <!--根级菜单-->
                <el-menu
                        mode="vertical"
                        :router=true
                        :collapse="false"
                        :default-active="this.$route.path"
                >
                    <menu-list :menu-list="menuList"></menu-list>
                </el-menu>
            </el-col>
        </el-row>
        </el-scrollbar>
    </el-aside>

</template>

<script>
    import MenuList from "./MenuList";

    export default {
        name: "AsideMenu",
        components: {MenuList},
        data(){
            return {
                menuList: this.$store.state.asideMenus
            }
        }
    }
</script>

<style scoped>

</style>
