<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style>
    html,body,#app{
        height: 100%;
        width: 100%;
    }
    body{
        margin: 0;
    }
</style>
