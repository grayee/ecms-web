<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;权限管理
        </li>
        <li class="active">用户管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <!--------------------------
        | Your Page Content Here |
        -------------------------->
      <Layout>
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">
          <Panel title="查询条件" :collapsible="true" :bodyStyle="{padding:'10px',marginBottom:'5px'}">
            <Form :model="user" :labelWidth="120" labelAlign="right">
              <div style="margin-bottom:10px">
                <Label for="loginId" align="right">登录账号：</Label>
                <TextBox inputId="loginId" name="loginId" v-model="user.loginId"></TextBox>
                <Label for="username" align="right">用户名：</Label>
                <TextBox inputId="username" name="username" v-model="user.username"></TextBox>
                <Label for="userStatus" style="text-align: right">用户状态: </Label>
                <ComboBox inputId="userStatus" v-model="value" :data="data"></ComboBox>
              </div>
              <div style="margin-bottom:10px">
                <Label for="name" style="text-align: right">所属机构:</Label>
                <ComboBox inputId="c1" v-model="value" :data="data"></ComboBox>

                <Label for="d2" align="right">创建日期： </Label>
                <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateFrom"
                         v-model="user.createDateFrom"></DateBox>
                至
                <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateTo" v-model="user.createDateTo"></DateBox>
                <Label/>

                <LinkButton iconCls="icon-search" style="width:60px" @click="search()">查询</LinkButton>
                <LinkButton iconCls="icon-cancel" style="width:60px" @click="reset()"> 重置</LinkButton>
              </div>
            </Form>
          </Panel>

          <Panel title="列表" :bodyStyle="{padding:'3px'}">

            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">列表</div>
                <div>
                  <LinkButton iconCls="icon-add" :plain="true" @click="toRef()">关联</LinkButton>
                  <LinkButton iconCls="icon-add" :plain="true" @click="toAdd()">新增</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>

                  <MenuButton text="授权管理" :plain="true" iconCls="icon-add">
                    <Menu @itemClick="add($event)">
                      <MenuItem   text="授权角色"></MenuItem>
                      <MenuItem   text="数据授权"></MenuItem>
                      <MenuItem   text="功能授权"></MenuItem>
                    </Menu>
                  </MenuButton>


                  <LinkButton iconCls="icon-back" :plain="true" @click="goBack()"></LinkButton>
                  <LinkButton iconCls="icon-filter" :plain="true" @click="$refs.d2.open()">调整显示列</LinkButton>
                </div>
              </div>
            </template>

            <DataGrid style="height:100%" :pagination="true" :lazy="true" :pageList="pageList"
                      :data="data" :total="total" :loading="loading" :pageNumber="pageNumber"
                      :pageSize="pageSize" :pagePosition="pagePosition" :pageLinks="5"
                      :pageLayout="['list','sep','first','prev','sep','tpl','sep','next','last','sep','refresh','links','info']"
                      @pageChange="onPageChange($event)" :selectionMode="'multiple'"
                      @selectionChange="selected($event)">

              <div slot="tpl" slot-scope="{datagrid}">
                &nbsp;第
                <NumberBox style="width:80px;height:23px" spinAlign="left" :spinners="true"
                           v-model="datagrid.pageNumberState"
                           :min="1" :max="Math.floor((total-1)/pageSize+1)"
                           :inputStyle="{textAlign:'left'}">
                  <Addon align="right">
                    <LinkButton iconCls="icon-search"
                                :style="{borderRadius:0,borderWidth:'0 1px 0 0',width:'20px'}"></LinkButton>
                  </Addon>
                </NumberBox>
                页,共 {{Math.floor((total-1)/pageSize+1)}} 页 &nbsp;
              </div>

              <GridColumn align="center" cellCss="datagrid-td-rownumber" width="3%">
                <template slot="header" slot-scope="scope">
                  <input type="checkbox" @click="checkAll($event)"/>
                </template>
                <template slot="body" slot-scope="scope">
                  <input type="checkbox" v-model="checkedIds" :value="scope.row.id"/>
                </template>
              </GridColumn>

              <GridColumn align="center" cellCss="datagrid-td-rownumber" width="3%">
                <template slot="header" slot-scope="scope">
                  <span>序</span>
                </template>
                <template slot="body" slot-scope="scope">
                  {{scope.rowIndex + 1}}
                </template>
              </GridColumn>

              <GridColumn v-for="column in displayColumns" :field="column.field" :title="column.title"
                          v-if="column.show" :align="column.align" :sortable="column.sortable" :width="column.width">
              </GridColumn>
            </DataGrid>
          </Panel>

          <Dialog ref="d2" :title="'调整显示列'" :dialogStyle="{width:'300px',height:'500px'}" :draggable="true"
                  :closed="true" :modal="true">

            <DataList style="width:100%;height:410px;" :data="displayColumns"
                      selectionMode="multiple" @rowClick="onRowClick($event)">
              <template slot-scope="scope">
                <div class="dataList">
                  <input type="checkbox" :value="scope.row.field" :id="scope.row.id" v-model="checkedFields"
                         style="margin-bottom: 3px"/>
                  <label :for="scope.row.id">{{scope.row.title}}</label>
                </div>
              </template>
            </DataList>

            <div class="dialog-button">
              <LinkButton style="width:60px" @click="submitForm($refs.d2)">确认</LinkButton>
              <LinkButton style="width:60px" @click="$refs.d2.close()">取消</LinkButton>
            </div>
          </Dialog>

          <Dialog ref="d1" :title="userDialogTitle" :dialogStyle="{width:'480px',height:'400px'}"
                  bodyCls="f-column" :draggable="true" :closed="true" :modal="true">
            <div class="f-full" style="padding: 20px 60px 20px 20px">
              <p>
                友情提示：密码至少为6位，只能为数字、字母、下划线，不能使用中文。
              </p>
              <Form ref="form" :model="user">
                <Label for="username" align="right">用户姓名:</Label>
                <ComboTree name='username' :data="data" v-model="user.username" placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <div class="error">{{ errors.first('username') }}</div>

                <Label for="loginId" align="right">登录账号:</Label>
                <TextBox inputId="loginId" name="loginId" v-model="user.loginId" style="width:14em"
                         v-validate="'required|max:10'" data-vv-as="登录账号" placeholder="请输入登录账号" iconCls="icon-man"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('loginId') }}</div>

                <Label for="password" align="right">登录密码:</Label>
                <PasswordBox inputId="password" v-model="user.password" style="width:14em" v-validate="'required|min:6'"
                             data-vv-as="登录密码" placeholder="请输入登录密码:"></PasswordBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('password') }}</div>

                <Label for="pwdConfirm" align="right">确认密码:</Label>
                <PasswordBox inputId="pwdConfirm" v-model="user.password" style="width:14em" placeholder="请确认登录密码:"></PasswordBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('pwdConfirm') }}</div>

                <Label for="enableStatus" align="right">是否启用:</Label>
                <label>
                  <input type="radio" name="enableStatus" id="e1" value="1" v-model="user.enableStatus" checked> 是
                </label>
                <label>
                  <input type="radio" name="enableStatus" id="e0" value="0" v-model="user.enableStatus" >否
                </label>
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
        total: 0,
        pageNumber: 0,
        pageSize: 20,
        data: [],
        checkedIds: [],
        checkedFields: [],
        pageList: [10, 20, 30, 40, 50],
        loading: false,
        pagePosition: "bottom",
        displayColumns: [],
        user: {},
        userDialogTitle:""
      };
    },
    created() {
      this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize);
      },
      loadPage(pageNumber, pageSize, filters) {
        this.loading = true;
        this.$api.user.userList({
          pageNo: pageNumber,
          pageSize: pageSize,
          queryFilters: filters
        }).then((response) => {
          //console.log("--->", response.data);
          let result = response.data.data;
          this.total = result.totalCount;
          this.pageNumber = result.pageNo;
          this.data = result.content;
          this.loading = false;
          this.displayColumns = result.extras.displayColumns;
          this.displayColumns.forEach((item, i) => {
            if (item.show) {
              this.checkedFields.push(item.field);
            }
          });
        }).catch(error => {
          console.log("error", error);
        });
      },
      search() {
        let filters = [];
        let dateFmt = Vue.filter('dateFmt');
        for (let field in this.user) {
          let filter = {};
          if (field.endsWith("From")) {
            filter.property = field.substr(0, field.indexOf("From"));
            filter.operator = "greaterThanOrEqualTo";
            filter.value = dateFmt(this.user[field]);
          } else if (field.endsWith("To")) {
            filter.property = field.substr(0, field.indexOf("To"));
            filter.operator = "lessThanOrEqualTo";
            filter.value =  dateFmt(this.user[field],1);
          } else {
            filter.property = field;
            filter.operator = "like";
            filter.value = this.user[field];
          }
          filters.push(filter);
        }
        this.loadPage(this.pageNumber, this.pageSize, filters);
      },
      reset() {
        this.user = {};
      },
      remove() {
        if (this.checkedIds.length > 0) {
          this.$api.user.userDel(this.checkedIds).then((response) => {
            this.loadPage(this.pageNumber, this.pageSize);
          }).catch(error => {
            console.log("error", error);
          });
        } else {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
        }
      },
      edit() {
        if (this.checkedIds.length === 1) {
          this.userDialogTitle = "用户编辑";
          this.$api.user.userDetail(this.checkedIds[0]).then((response) => {
            this.user = response.data.data;
          }).catch(error => {
            console.log("get menu detail error", error);
          });

          this.$refs.d1.open();
        } else {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
        }
      },
      refresh() {
        location.reload();
      },
      print() {
        let printhtml = window.document.body.innerHTML; // 获取打印区域
        let oldhtml = window.document.innerHTML; // 保存原始内容
        document.innerHtml = printhtml; // 赋值打印
        window.print();
        document.innerHtml = oldhtml; // 还原页面
        window.location.reload(); // 刷新解决页面无法点击
      },
      goBack() {
        this.$router.go(-1);
      },
      toRef() {
        this.user = {};
        this.user.enableStatus = 1;
        this.userDialogTitle = "用户关联";
        this.$refs.d1.open();
      },
      toAdd() {
        this.$router.push({path: '/auth/user/add'});
      },
      onRowClick(row) {
        if (this.checkedFields.indexOf(row.field) > -1) {
          delete this.checkedIds[this.checkedFields.indexOf(row.field)];
        } else {
          this.checkedFields.push(row.field);
        }
      },
      selected(event) {
        this.checkedIds = [];
        let _this = this;
        event.forEach(function (item, i) {
          _this.checkedIds.push(item.id);
        });
      },
      checkAll(event) {
        if (event.currentTarget.checked) {
          this.checkedIds = [];
          let _this = this;
          this.data.forEach(function (item, i) {
            _this.checkedIds.push(item.id);
          });
        } else {
          this.checkedIds = [];
        }
      },
      submitForm(dialog) {
        if (this.checkedFields.length <= 0) {
          alert("请至少选中一条数据");
        } else {
          this.displayColumns.forEach((column, index) => {
            column.show = this.checkedFields.indexOf(column.field) > -1;
          });
          dialog.close();
        }
      },
      confirm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.user));
            if (this.user.id) {

            } else {

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
  .dataList {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    height: 35px;
    border-bottom: 1px solid #eee;
  }
</style>
