<template>
  <aside id="slider" class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel (optional)  deleted ......-->

      <!-- search form (Optional) -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
        </div>
      </form>
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">导航菜单</li>
        <tree-view  v-for="(menu, index) in menus" :key="index" class="item" :model="menu" >
        </tree-view>
      </ul>

      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>

  import TreeView from './TreeView';

  export default {
    components: {
      "tree-view": TreeView
    },
    name: 'NaviMenu',
    data() {
      return {
        title: 'Navigation menu bar'
      }
    },
    props: {
      menus: {
        default: () => []
      }
    },
    computed: {
      path: function () {
        return location.pathname;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
