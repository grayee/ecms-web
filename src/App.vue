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
  /* sasyUI 输入框样式控制 */
  .f-field {
    width: 12em;
    height: 26px;
  }
  /* easyui panel头部高度样式 */
 .panel-header {
   padding: 1px 5px;
 }
 .content{
   min-height: 500px;
 }
  .l-btn-text{
    line-height: 24px
  }
  .textbox-label {
    width: 120px;
  }
  /* 错误提示信息样式*/
 .error {
   color: red;
   font-size: 12px;
 }
 /*标签右对齐*/
  label {
    text-align: right;
    padding-left: 4px;
    cursor: pointer;
    margin: 0;
    vertical-align: middle;
  }
  input[type=radio],input[type=checkbox]{
    display: inline-block;
    vertical-align: middle;
    margin-top: 0;
  }
</style>
