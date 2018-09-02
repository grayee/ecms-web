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

      <ul class="sidebar-menu" data-widget="tree">
        <li :class="['treeview', path == item.path ? 'active' : '']" v-for="(item,index) in menus" :key="index">
          <a :href="item.path">
            <i :class="['fa', 'fa-' + item.icon]"></i>
            <span>{{item.text}}</span>
          </a>
        </li>
      </ul>

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">导航菜单</li>
        <!-- Optionally, you can add icons to the links -->

        <li class="treeview active">
          <a href="#" data-url="/org/tree"><i class="fa fa-sitemap"></i> <span>组织管理</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>

          <ul class="treeview-menu" style="display: block;">
            <li><a href="#" data-url="/user/page/list"><i class="fa fa-user"></i><span>组织机构管理</span></a></li>
            <li><a href="#" data-url="/function/tree"><i class="fa fa-cog"></i><span>公司档案管理</span></a></li>
            <li><a href="#" data-url="/role/list"><i class="fa fa-street-view"></i><span>部门档案管理</span></a></li>
            <li><a href="#" data-url="/rolefunc/list"><i class="fa fa-key"></i><span>岗位信息管理</span></a></li>
            <li><a href="#" data-url="/dict/tree"><i class="fa fa-book"></i><span>人员档案管理</span></a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#"><i class="fa fa-link"></i> <span>权限管理</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i>用户管理</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i>角色管理</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i>菜单管理</a></li>
            <li class="treeview">
              <a href="#"><i class="fa fa-circle-o"></i>授权管理
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu" style="display: none;">
                <li><a href="#"><i class="fa fa-circle-o"></i>用户授权</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i>角色授权</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i>机构授权</a></li>
              </ul>
            </li>
            <li class="treeview">
              <a href="#"><i class="fa fa-circle-o"></i>资源注册
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu" style="display: none;">
                <li><a href="#"><i class="fa fa-circle-o"></i>按钮注册</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i>字段注册</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i>记录注册</a></li>
              </ul>
            </li>

          </ul>
        </li>

        <li class="treeview">
          <a href="#"><i class="fa fa-link"></i> <span>系统管理</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i>字典管理</a></li>

            <li><a href="#"><i class="fa fa-circle-o"></i>在线用户管理</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i>登录日志管理</a></li>
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
      menus : {
        default : () => []
      }
    },
    computed: {
      path(){
        return location.pathname;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
