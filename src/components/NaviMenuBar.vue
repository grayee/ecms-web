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
        <!-- Optionally, you can add icons to the links -->

        <li :class="['treeview', path === parent.path ? 'active' : '']" v-for="(parent,index) in menus" :key="index">
          <a :href="parent.path">
            <i :class="['fa', 'fa-' + parent.icon]"></i>
            <span>{{parent.text}}</span>
            <span v-if="parent.children" class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <!-- 第二级-->
          <ul v-if="parent.children" class="treeview-menu" style="display: none;">
            <li :class="['', child.children ? 'treeview' : '']" v-for="(child, index) in parent.children" :key="index">

              <router-link :to="{ path:child.path}">
                <i :class="['fa', 'fa-' + child.icon]"></i>
                <span>{{child.text}}</span>
                <span v-if="child.children" class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
              </router-link>

              <!-- 第三级-->
              <ul v-if="child.children" class="treeview-menu" style="display: none;">
                <li v-for="(childSub, index) in child.children" :key="index">
                  <a :href="childSub.path">
                    <i :class="['fa', 'fa-' + childSub.icon]"></i>
                    <span>{{childSub.text}}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>

  export default {
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
