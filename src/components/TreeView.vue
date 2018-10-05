<!-- tree template -->
<template>
  <li :class="['treeview', path === model.path ? 'active' : '']" >
    <div @click="toggle" @dblclick="changeType">
      {{ model.text }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>

    <ul v-show="open" v-if="isFolder">
      <tree-view v-for="(model, index) in model.children" :key="index" :menus="model"/>
      <li class="add" @click="addChild">+</li>
    </ul>

  </li>
</template>

<script>
  export default {
    name:"tree-view",
    props: {
      model: Array
    },
    data: function () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length
      }
    }
  }

</script>


<style scoped>

</style>
