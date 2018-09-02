<template>
  <li @click="handleDelete">{{content}}</li>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['content','index'],
  methods:{
    handleDelete(){
      //alert(this.index);
      this.$emit('delete',this.index)
    }
  }
}
</script>

<style scoped>

</style>
