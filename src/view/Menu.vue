<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;权限管理
        </li>
        <li class="active">菜单管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <Layout>
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">
          <Panel title="查询条件" :collapsible="true" :bodyStyle="{padding:'10px',marginBottom:'5px'}">
            <div style="margin-bottom:10px">
              <div style="float: left">
                <Label for="name">菜单名称:</Label>
                <TextBox inputId="name"  v-model="menuName"></TextBox>

                <Label for="d2">修改日期： </Label>
                <DateBox inputId="d2" format="yyyy-MM-dd"></DateBox>
                至
                <DateBox inputId="d2" format="yyyy-MM-dd"></DateBox>

              </div>
              <div style="float: right">
                <LinkButton iconCls="icon-search" style="width:80px" @click="search()">查询</LinkButton>
                <LinkButton iconCls="icon-cancel" style="width:80px" @click="reset()"> 重置</LinkButton>
              </div>
            </div>
          </Panel>

          <Panel title="列表" :bodyStyle="{padding:'3px'}">
            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">列表</div>
                <LinkButton iconCls="icon-add" :plain="true" @click="add()">新增</LinkButton>
                <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                <LinkButton iconCls="icon-edit" :plain="true" @click="edit()&&$refs.d1.open()">编辑</LinkButton>
                <LinkButton iconCls="icon-back" :plain="true" @click="go(-1)"></LinkButton>
              </div>
            </template>
            <TreeGrid ref="t1"  style="height:80%" :data="data" idField="id" treeField="text" :footerData="footerData"
                       :showFooter="true" @selectionChange="selection=$event">
              <GridColumn field="text" title="菜单名称"></GridColumn>
              <GridColumn field="path" title="路径"></GridColumn>
              <GridColumn field="component" title="组件名称"></GridColumn>
              <GridColumn field="orderNo" title="排序编码"></GridColumn>
              <GridColumn field="date" title="修改日期"></GridColumn>
            </TreeGrid>
          </Panel>

          <Dialog ref="d1" :title="'添加菜单'" :dialogStyle="{width:'480px',height:'500px'}"
                  bodyCls="f-column" :draggable="true" :closed="true" :modal="true">
            <div class="f-full" style="padding: 20px 60px 20px 20px">
              <Form ref="form" :model="menu">
                <Label for="menuType" align="left">菜单类型:</Label>
                <label v-for="(mt,index) in menuType" :key="index">
                  <input type="radio" :value='mt.value' v-model="menu.type">{{mt.text}} &nbsp;&nbsp;
                </label>
                <div class="error">{{ errors.first('menuType') }}</div>

                <Label for="menuParent" align="left">上级菜单:</Label>
                <ComboTree name='menuParent' :data="menus" v-model="menu.parentId" placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <div class="error">{{ errors.first('menuParent') }}</div>

                <Label for="menuName" align="left">菜单名称:</Label>
                <TextBox inputId="menuName" name="menuName" v-model="menu.name" style="width:20em"
                         v-validate="'required|max:10'" placeholder="请输入菜单名称"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('menuName') }}</div>

                <Label for="menuPath" align="left">菜单路径:</Label>
                <TextBox inputId="menuPath" name="menuPath" v-model="menu.url" style="width:20em"
                         v-validate="'max:100'" placeholder="请输入菜单路径"></TextBox>
                <div class="error">{{ errors.first('menuPath') }}</div>

                <Label for="component" align="left">组件名称:</Label>
                <TextBox inputId="component" name="component" v-model="menu.component" style="width:20em"
                         v-validate="'max:100'" placeholder="请输入组件名称"></TextBox>
                <div class="error">{{ errors.first('component') }}</div>

                <Label for="menuIcon" align="left">菜单图标:</Label>
                <TextBox inputId="menuIcon" name="menuIcon" v-model="menu.icon" style="width:20em"
                         v-validate="'required'" placeholder="请输入菜单图标样式"></TextBox>
                <div class="error">{{ errors.first('menuIcon') }}</div>

                <Label for="orderNo" align="left">排序编码:</Label>
                <NumberBox inputId="orderNo" name="orderNo" v-model="menu.orderNo" v-validate="'required'"
                           placeholder="请输入排序编码" :value="100" :spinners="true"></NumberBox>
                <div class="error">{{ errors.first('orderNo') }}</div>

                <Label for="remark" align="left">备注信息:</Label>
                <TextBox inputId="remark" name="remark" :multiline="true" v-model="menu.remark"
                         style="width:63%;height:100px;"></TextBox>
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
        data: null,
        footerData: [],
        selection: {},
        loading: false,
        pagePosition: "bottom",
        menu: {},
        menuType: [
          {value: 0, text: "目录"},
          {value: 1, text: "功能菜单"},
          {value: 2, text: "页面按钮"},
        ],
        menuName:null,
        menus: null
      };
    },
    created() {
      this.initData();
      this.footerData = [{
        text: "汇总信息:",
        path: 99
      }];
    },
    methods: {
      initData() {
        this.getData().then(result => {
          const mapChildren = function (result) {
            result.map(value => {
              value.date = value.attributes.modifyDate;
              value.type = value.attributes.menuType;
              value.orderNo = value.attributes.orderNo;
              value.component = value.attributes.component;
              delete value.attributes;
              if (value.children) {
                mapChildren(value.children);
              }
              return value;
            });
            return result;
          };
          const menuList = mapChildren(result);
          this.data = menuList;
          this.menus = JSON.parse(JSON.stringify(menuList))
        });
      },
      getData() {
        return new Promise((resolve, reject) => {
          this.$api.menu.getMenuTree('').then(response => {
            const result = response.data.data;
            resolve(result);
          }).catch(error => {
            reject(error);
          });
        });
      },
      search(){
        this.$refs.t1.doFilter({field:'text',op:'equal',value:this.menuName});
      },
      add() {
        this.menu = {
          name: null,
          url: null,
          component: null,
          orderNo: null,
          type: 1,
          icon: null,
          parentId: null,
          remark: null
        };
        if (this.selection) {
          this.menu.parentId = this.selection.id;
          this.$refs.d1.open();
        } else {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
        }
      },
      remove() {
        //console.log(this.selection);
        if (this.selection.id) {
          const ids = [];
          ids.push(this.selection.id);
          this.$api.menu.menuDel(ids).then((response) => {
            console.log("--->", response.data);
            this.initData();
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
        if (this.selection.id) {
          console.log(this.selection);
          this.$api.menu.menuDetail(this.selection.id).then((response) => {
            const result = response.data.data;
            this.menu.id = result.id;
            this.menu.parentId = result.parentId;
            this.menu.name = result.name;
            this.menu.type = result.type;
            this.menu.url = result.url;
            this.menu.component = result.component;
            this.menu.orderNo = result.orderNo;
            this.menu.remark = result.remark;
            this.menu.icon = result.icon;
            this.menu.version = result.version;
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
      confirm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.menu));
            if (this.menu.id) {
              this.$api.menu.menuUpt(this.menu).then((response) => {
                this.initData();
                this.$refs.d1.close();k
              }).catch(error => {
                console.log("error", error);
              });
            } else {
              this.$api.menu.menuAdd(this.menu).then((response) => {
                console.log("--->", response.data);
                this.initData();
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
    margin: 4px 0 0 80px;
  }

  Label {
    text-align: right
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
