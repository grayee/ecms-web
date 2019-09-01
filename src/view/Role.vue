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
                      <MenuItem text="关联用户"></MenuItem>
                      <MenuItem text="数据授权"></MenuItem>
                      <MenuItem text="功能授权"></MenuItem>
                    </Menu>
                  </MenuButton>
                </div>
              </div>
            </template>
            <ul class="list-group">
              <li class="list-group-item" v-for="(org,index) in displayColumns"><strong>{{org.title}}：</strong>{{detailContent[org.field]}}
              </li>
            </ul>

            <div class="panel panel-default">
              <div class="panel-body">
                <Tabs style="height:250px">
                  <TabPanel :title="'功能权限'">
                    <p>Tab Panel1</p>
                  </TabPanel>
                  <TabPanel :title="'数据权限'">
                    <p>Tab Panel2</p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
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

          <Dialog ref="d1" :title="roleDialogTitle" :dialogStyle="{width:'480px',height:'365px'}"
                  bodyCls="f-column" :draggable="true" :closed="true" :modal="true">
            <div class="f-full" style="padding: 20px 60px 20px 20px">
              <Form ref="form" :model="role">
                <Label for="name" align="right">角色名称:</Label>
                <TextBox inputId="name" name="name" v-model="role.name" style="width:18em"
                         v-validate="'required|max:10'" data-vv-as="角色名称" placeholder="请输入角色名称"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('name') }}</div>

                <Label for="value" align="right">角色编码:</Label>
                <TextBox inputId="value" name="value" v-model="role.value" style="width:18em"
                         v-validate="'required|max:30'" data-vv-as="角色编码" placeholder="请输入角色编码"></TextBox>
                <div class="error">{{ errors.first('value') }}</div>

                <div>
                  <Label for="enableStatus" align="right">状态:</Label>
                  <label>
                    <input type="radio" name="enableStatus" id="e1" value="1" v-model="role.enableStatus" checked>
                    启用
                  </label>
                  <label>
                    <input type="radio" name="enableStatus" id="e0" value="0" v-model="role.enableStatus"> 禁用
                  </label>
                </div>

                <Label for="remark" align="right">备注信息:</Label>
                <TextBox inputId="remark" name="remark" :multiline="true" v-model="role.remark"
                         style="width:218px;height:100px;"></TextBox>
                <div class="error">{{ errors.first('remark') }}</div>
              </Form>
            </div>
            <div class="dialog-button">
              <LinkButton style="width:60px" @click="confirm()&&$refs.d1.close()">确认</LinkButton>
              <LinkButton style="width:60px" @click="$refs.d1.close()">取消</LinkButton>
            </div>
          </Dialog>

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
        selection: null,
        orgRelationData: [],
        displayColumns: [],
        detailContent: {},
        users: [],
        roleDialogTitle: "",
        role: {},
        loading: false
      };
    },
    created() {
      this.getTreeData();
    },
    methods: {
      getTreeData() {
        this.$api.user.getRoleTree('').then((response) => {
          if (response.status === 200) {
            this.orgRelationData = response.data.data;
            this.$refs.tree.selectNode(this.orgRelationData[0].children[0]);
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      add() {
        this.role = {};
        this.roleDialogTitle = "新增角色";
        if (this.selection.id) {
          this.role.enableStatus = 1;
          this.$refs.d1.open();
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
        }
      },
      edit() {
        this.roleDialogTitle = "编辑角色";
        if (this.selection.id) {
          this.role =this.detailContent;
          this.$refs.d1.open();
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
        }
      },
      remove() {
        if (this.selection) {
          this.$api.user.roleDel([this.detailContent.id]).then((response) => {
            this.getTreeData();
          }).catch(error => {
            console.log("error", error);
          });
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
        }
      },
      selected(event) {
        this.selection = event;
        this.$api.org.getOrgDetail(this.selection.id).then((response) => {
          if (response.status === 200) {
            let result = response.data.data;
            this.displayColumns = result.extras.displayColumns;
            this.detailContent = result.content;
            this.users = result.extras.users;
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      confirm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            this.role.parentId = this.selection.id;
            console.log("commit json data:" + JSON.stringify(this.role));
            if (this.role.id) {
              this.$api.user.roleUpt(this.role).then((response) => {
                this.getTreeData();
                this.$refs.d1.close();
              }).catch(error => {
                console.log("error", error);
              });
            } else {
              this.$api.user.roleAdd(this.role).then((response) => {
                this.getTreeData();
                this.$refs.d1.close();
              }).catch(error => {
                console.log("error", error);
              });
            }
          }
        });
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>

  .error {
    color: red;
    font-size: 12px;
    margin: 4px 120px;
  }

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
