<template>
  <div class="f-column">
    <div class="main-header f-row">
      <div class="f-row f-full">
        <div class="main-title f-animate f-row" :style="{width:width+'px'}">
          <img class="app-logo" src="https://www.jeasyui.com/favicon.ico">
          <span v-if="!collapsed">{{title}}</span>
        </div>
        <div class="main-bar f-full">
          <span class="main-toggle fa fa-bars" @click="toggle()"></span>
        </div>
        <div style="margin-right: 20px;">
          欢迎 {{this.$store.state.user.name}} 登陆，<a @click="logout()"><span style="color: white; ">退出</span></a>
        </div>
      </div>
    </div>
    <div class="f-row f-full">
      <div class="sidebar-body f-animate" :style="{width:width+'px'}">
        <div v-if="!collapsed" class="sidebar-user" style="margin-left: 30px">
          <router-link to="/dashboard"><i class="fa fa-home"
                                          style="font-size: 16px; position: relative; top: 2px; left: -3px;"></i>首页
          </router-link>
        </div>
        <SideMenu :data="menus" :border="false" :collapsed="collapsed" :animte="true"
                  @itemClick="onItemClick($event)"></SideMenu>
      </div>
      <div class="main-body f-full">
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
          <breadcrumb/>
          <router-view></router-view>
          <app-main-footer/>
        </div>
        <!-- /.content-wrapper -->
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from "vuex";
  //引入Footer局部组件
  import MainFooter from './MainFooter';
  //引入Footer局部组件
  import Breadcrumb from './Breadcrumb';
  export default {
    components: {
      "app-main-footer": MainFooter,
      "breadcrumb": Breadcrumb
    },
    data() {
      return {
        title: 'AppLayout',
        width: 200,
        collapsed: false,
        selectedMenu: null,
        tipContent: {
          component: Vue.extend({
            template: `
            <Panel :border="false" style="width:100px">
              <div style="text-align:center;padding:10px">
               <a @click="logout()"><span style="color: white; ">退出</span>
              </div>
            </Panel>
          `
          })
        }
      };
    },
    computed: {
      //访问 vuex store 中的数据
      //此处用到 es6 stage-2 才有的三个点展开对象的语法(对象展开运算符:...), 对应 .babelrc 中的配置
      ...mapState({
        "menus": state => state.user.menus
      })
    },
    methods: {
      toggle() {
        this.collapsed = !this.collapsed;
        this.width = this.collapsed ? 50 : 200;
      },
      logout() {
        this.$store.dispatch("LogOut", this.$store.state).then(() => {
          this.$router.push({
            path: '/login'
          });
        });
      },
      onItemClick(item) {
        this.$router.push({
          path: item.path
        });
        this.selectedMenu = item;
      }
    }
  };
</script>
<style>
  .sidemenu .accordion .panel-title {
    color: #b8c7ce;
  }

  .sidemenu .tree-title {
    margin: 8px 0;
  }

  .sidemenu .accordion .accordion-header {
    background: #222d32;
    color: #b8c7ce;
  }

  .sidemenu .accordion .accordion-body {
    background: #2c3b41;
    color: #8aa4af;
  }

  .sidemenu .accordion .accordion-header-selected {
    background: #1e282c;
  }

  .sidemenu .tree-node-hover {
    background: #2c3b41;
    color: #fff;
  }

  .sidemenu .tree-node-selected {
    background: #2c3b41;
    color: #fff;
  }

  .sidemenu .accordion-header .panel-tool {
    display: none;
  }

  .sidemenu .accordion-header::after,
  .sidemenu .tree-node-nonleaf::after {
    display: inline-block;
    vertical-align: top;
    border-style: solid;
    transform: rotate(45deg);
    width: 4px;
    height: 4px;
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -3px;
    border-width: 0 1px 1px 0;
  }

  .sidemenu .accordion-header-selected::after {
    transform: rotate(-135deg);
  }

  .sidemenu .tree-node-nonleaf::after {
    transform: rotate(-135deg);
  }

  .sidemenu .tree-node-nonleaf-collapsed::after {
    transform: rotate(45deg);
  }

  .sidemenu-collapsed .accordion-header::after {
    display: none;
  }

  .sidemenu-tooltip .accordion {
    border-color: #1e282c;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  .app-logo {
    width: 24px;
    height: 24px;
    color: #fff;
    margin: 13px 10px;
  }

  .main-header {
    background: #3c8dbc;
    color: #fff;
    line-height: 50px;
    height: 50px;
  }

  .main-title {
    background: #367fa9;
    font-size: 20px;
    text-align: center;
    overflow: hidden;
  }

  .main-bar {
    background: #3c8dbc;
  }

  .main-toggle {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    color: #fff;
    margin: 0 10px;
  }

  .main-body {
    background: #ecf0f5;
    min-height: 600px;
    width: 1000px;
  }

  .sidebar-body {
    background: #222d32;
    min-height: 600px;
  }

  .sidebar-user {
    color: #fff;
    padding: 10px;
    line-height: 20px;
  }

  .content-wrapper, .main-footer {
    margin-left: 0px;
  }

  .datagrid-header-inner {
    width: 800px;
  }
</style>
