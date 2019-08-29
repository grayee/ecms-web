<!-- 组织管理视图 -->
<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;首页 > 权限管理
        </li>
        <li class="active">角色管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <Layout>
        <LayoutPanel region="west" :split="true" :bodyStyle="{padding:'3px'}" title="角色树" style="width:200px;">
          <Tree ref="tree" :data="orgRelationData" :checkbox="false" @selectionChange="selected($event)"></Tree>
        </LayoutPanel>

        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Panel title="详情" :bodyStyle="{padding:'10px',marginBottom:'5px'}" style="height:50%">
            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">详情</div>
                <div>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="add()">新增</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <MenuButton text="授权管理" :plain="true" iconCls="icon-add">
                    <Menu @itemClick="add($event)">
                      <MenuItem   text="关联用户"></MenuItem>
                      <MenuItem   text="数据授权"></MenuItem>
                      <MenuItem   text="功能授权"></MenuItem>
                    </Menu>
                  </MenuButton>
                </div>
              </div>
            </template>
            <ul class="list-group">
              <li class="list-group-item" v-for="(org,index) in displayColumns"><strong>{{org.title}}：</strong>{{detailContent[org.field]}}
              </li>
            </ul>
          </Panel>

          <Panel :bodyStyle="{padding:'3px'}">
            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">已关联用户列表</div>
                <div>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">解除关联用户</LinkButton>
                </div>
              </div>
            </template>
            <DataGrid :data="users" style="height:250px">

              <GridColumn align="center" cellCss="datagrid-td-rownumber" width="3%">
                <template slot="header" slot-scope="scope">
                  <input type="checkbox" @click="checkAll($event)"/>
                </template>
                <template slot="body" slot-scope="scope">
                  <input type="checkbox" v-model="checkedIds" :value="scope.row.id"/>
                </template>
              </GridColumn>

              <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" title="序">
                <template slot="body" slot-scope="scope">
                  {{scope.rowIndex + 1}}
                </template>
              </GridColumn>

              <GridColumn field="username" title="用户名" align="center"></GridColumn>
              <GridColumn field="loginId" title="登录账号" align="center"></GridColumn>
              <GridColumn field="email" title="用户邮箱" align="center"></GridColumn>
              <GridColumn field="mobilePhone" title="手机号码" align="center"></GridColumn>
              <GridColumn field="enableStatus" title="状态" align="center"></GridColumn>
              <GridColumn field="createDate" title="创建时间" align="center"></GridColumn>
            </DataGrid>
          </Panel>
        </LayoutPanel>
      </Layout>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<!-- 2.行为 :处理逻辑-->
<script>
  export default {
    data() {
      return {
        selectedId: null,
        orgRelationData: [],
        displayColumns: [],
        detailContent: {},
        users:[],
        loading: false
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.user.getRoleTree('').then((response) => {
          if (response.status === 200) {
            this.orgRelationData = response.data.data;
            this.$refs.tree.selectNode(this.orgRelationData[0]);
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      add(event) {
        let urlName;

        this.$router.push({name: urlName, params: {pid: this.selectedId}});
      },
      edit() {
        let urlPath;

        //path来匹配路由，然后通过query来传递参数
        this.$router.push({path: urlPath + '?orgId=' + this.detailContent.id});
      },
      remove(){
        let orgId = this.detailContent.id;

      },
      selected(event) {
        this.selectedId = event.id;
        this.$api.org.getOrgDetail(this.selectedId).then((response) => {
          if (response.status === 200) {
            let result = response.data.data;
            this.displayColumns = result.extras.displayColumns;
            this.detailContent = result.content;
            this.users = result.extras.users;
          }
        }).catch(error => {
          console.log("error", error);
        });
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .panel-header {
    background-color: #f5f5f5;
  }

  .panel {
    min-height: 200px;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
