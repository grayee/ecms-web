<!--  根组件 -->
<!-- 1.模板 :html 结构-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<!-- 2.行为 :处理逻辑-->
<script>
  export default {
    name: 'App',
    data() {
      return {
        msg: 'Welcome to my Vue App!'
      }
    }
  }
</script>

<!-- 3.样式:解决样式     -->
<style>

</style>
