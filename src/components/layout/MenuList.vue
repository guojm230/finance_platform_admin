<template>

    <el-row>
        <template v-for="menu in menuList">
            <el-menu-item :index="menu.url"
                          v-if="menu.leaf"
                          :key="menu.id"
            >
                <span slot="title">{{menu.name}}</span>
            </el-menu-item>
            <el-submenu :index="menu.id.toString()" v-else :key="menu.id">
                <template slot="title">{{menu.name}}</template>
                <menu-list :menu-list="menu.subMenus"></menu-list>
            </el-submenu>
        </template>
    </el-row>

</template>

<script>
    export default {
        name: "MenuList",
        props:['menuList']
    }
</script>

<style scoped>

</style>
