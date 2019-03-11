<template>
    <el-container id="main">
        <el-header>
            <top-bar></top-bar>
        </el-header>
        <el-container>
            <aside-menu></aside-menu>
            <el-main class="main-content">
                <el-scrollbar :native="false" :noresize="true" class="c-scrollbar">
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import TopBar from "../components/layout/TopBar.vue";
    import AsideMenu from "../components/layout/AsideMenu.vue";
    import {Component,Vue} from "vue-property-decorator";

    @Component({
      name: "Main",
      components: {AsideMenu, TopBar}
    })
    export default class Main extends Vue{
    }
</script>

<style scoped>

    #main{
        height: 100%;
        width: 100%;
    }

    .main-content{
        padding: 0;
        height: 100%;
        overflow: hidden;
    }

</style>
