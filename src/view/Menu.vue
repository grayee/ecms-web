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
        <li class="active">菜单管理</li>
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
            <div style="margin-bottom:10px">
              <Label for="d2">日期： </Label>
              <DateBox inputId="d2" format="yyyy-MM-dd"></DateBox>
              至
              <DateBox inputId="d2" format="yyyy-MM-dd"></DateBox>
              <Label for="c1">条件1: </Label>
              <ComboBox inputId="c1" :data="data"></ComboBox>
            </div>
            <div style="margin-bottom:10px">
              <div style="float: left">
                <Label for="name">条件2:</Label>
                <TextBox inputId="name"></TextBox>
                <Label for="n1">条件3:</Label>
                <NumberBox inputId="n1" :value="100" :spinners="true"></NumberBox>
              </div>
              <div style="float: right">
                <LinkButton iconCls="icon-search" style="width:80px">查询</LinkButton>
                <LinkButton iconCls="icon-cancel" style="width:80px"> 重置</LinkButton>
              </div>
            </div>
          </Panel>

          <Panel title="列表" :bodyStyle="{padding:'3px'}">

            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">列表</div>
                <div>
                  <LinkButton iconCls="icon-add" :plain="true" @click="add()&&$refs.d1.open();">新增</LinkButton>
                  <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                  <LinkButton iconCls="icon-print" :plain="true" @click="print()">打印</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true" @click="go(-1)"></LinkButton>
                </div>
              </div>
            </template>
            <TreeGrid style="height:80%"
                      :data="data" idField="id" treeField="text" :footerData="footerData" :showFooter="true"
                      @selectionChange="selection=$event">
              <GridColumn field="text" title="菜单名称"></GridColumn>
              <GridColumn field="path" title="路径"></GridColumn>
              <GridColumn field="date" title="修改日期"></GridColumn>
            </TreeGrid>
          </Panel>

          <Dialog ref="d1"
                  :title="'添加菜单'"
                  :dialogStyle="{width:'450px',height:'450px'}"
                  bodyCls="f-column" :draggable="true" :closed="true"
                  :modal="true">
            <div class="f-full" style="padding: 20px 60px 20px 20px">
              <Form ref="form" :model="menu">
                <Label for="menuParent" align="left">上级菜单:</Label>
                <ComboTree name='menuParent' :data="menus" v-model="menu.parentId" v-validate="'required'"
                           placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('menuParent') }}</div>

                <Label for="menuName" align="left">菜单名称:</Label>
                <TextBox inputId="menuName" name="menuName" v-model="menu.name"
                         v-validate="'required|max:5'" placeholder="请输入菜单名称"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('menuName') }}</div>

                <Label for="menuPath" align="left">菜单路径:</Label>
                <TextBox inputId="menuPath" name="menuPath" v-model="menu.url" v-validate="'required|alpha_num'"
                         placeholder="请输入菜单路径"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ errors.first('menuPath') }}</div>

                <Label for="menuIcon" align="left">菜单图标:</Label>
                <TextBox inputId="menuIcon" name="menuIcon" v-model="menu.icon" v-validate="'required'"
                         placeholder="请输入菜单图标样式"></TextBox>
                <div class="error">{{ errors.first('menuIcon') }}</div>

                <Label for="orderNo" align="left">排序编码:</Label>
                <TextBox inputId="orderNo" v-validate="'required'" name="orderNo" v-model="menu.orderNo"
                         placeholder="请输入排序编码"></TextBox>
                <div class="error">{{ errors.first('orderNo') }}</div>

                <Label for="menuType" align="left">菜单类型:</Label>
                <ComboBox inputId='menuType' name="menuType" :data="menuType" v-validate="'required'"
                          placeholder="-请选择-"
                          v-model="menu.type"></ComboBox>
                <div class="error">{{ errors.first('menuType') }}</div>

                <Label for="remark" align="left">备注信息:</Label>
                <TextBox inputId="t2" name="remark" :multiline="true" :value="remark"
                         style="width:63%;height:100px;"></TextBox>
                <div class="error">{{ errors.first('remark') }}</div>
              </Form>
            </div>
            <div class="dialog-button">
              <LinkButton style="width:60px" @click="submitForm()">确认</LinkButton>
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
        footerData: null,
        selection: {},
        loading: false,
        pagePosition: "bottom",
        menu: {
          name: null,
          url: null,
          orderNo: null,
          type: 1,
          icon: null,
          parentId: null,
          remark: null
        },
        menuType: [
          {value: 0, text: "目录"},
          {value: 1, text: "功能菜单"},
          {value: 2, text: "页面按钮"},
        ],
        menus: null
      };
    },
    created() {
      this.getData().then(result => {
        const mapChildren = function (result) {
          result.map(value => {
            value.date = value.attributes.modifyDate;
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

      this.footerData = {
        text: "汇总信息:",
        path: 99
      };
    },
    methods: {
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
      add() {
        if (this.selection) {
          this.menu.parentId = this.selection.id;
          return true;
        } else {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
          return false;
        }
      },
      remove() {
        //console.log(this.selection);
        if (!this.selection) {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
        }
      },
      edit() {
        console.log("edit");
      },
      refresh() {
        console.log("refresh");
      },
      print() {
        console.log("add");
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.menu));
            this.$api.menu.menuAdd(this.menu).then((response) => {
              console.log("--->", response.data);
            }).catch(error => {
              console.log("error", error);
            });
          }
        })
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
