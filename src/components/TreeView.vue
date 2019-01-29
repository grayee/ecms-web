<!-- tree template -->
<template>
  <li :class="['treeview', path === model.path ? 'active' : '']">
    <router-link :to="{ path:model.path}">
      <i :class="['fa', 'fa-' + model.iconCls]"></i>
      <span>{{model.text}}</span>
      <span v-if="model.children" class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
    </router-link>
    <ul v-show="open" v-if="isFolder" class="treeview-menu" style="display: none;">
      <tree-view v-for="(child, index) in model.children" :key="index" :model="child"/>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "TreeView",
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length
      },
      path: function () {
        return location.pathname;
      }
    },
    method: {
      toggle: function () {
        console.log(this.open);
        if (this.isFolder) {
          this.open = !this.open
        }
      }
    }
  }

</script>


<style scoped>

</style>
