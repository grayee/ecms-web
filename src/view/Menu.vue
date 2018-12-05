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
                  <LinkButton iconCls="icon-add" :plain="true" @click="$refs.d1.open()">新增</LinkButton>
                  <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                  <LinkButton iconCls="icon-print" :plain="true" @click="print()">打印</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true" @click="go(-1)"></LinkButton>
                </div>
              </div>
            </template>
            <TreeGrid style="height:80%"
                      :data="data" idField="id" treeField="name" :footerData="footerData" :showFooter="true">
              <GridColumn field="name" title="菜单名称"></GridColumn>
              <GridColumn field="size" title="Size"></GridColumn>
              <GridColumn field="date" title="修改日期"></GridColumn>
            </TreeGrid>
          </Panel>

          <Dialog ref="d1"
                  :title="'添加'"
                  :dialogStyle="{width:'600px',height:'400px'}"
                  bodyCls="f-column" :draggable="true" :closed="true"
                  :modal="true">
            <div class="f-full" style="padding: 20px 60px 20px 20px">
              <Form ref="form" :model="company">
                <div style="float: left;margin-bottom:10px">
                  <Label for="name" align="left">公司名称:</Label>
                  <TextBox inputId="name" name="name" v-model="company.name" v-validate="'required|min:5'"
                           placeholder="请输入公司名称"/>
                  <div class="error">{{ errors.first('name') }}</div>
                </div>
                <div style="float: right;margin-bottom:10px">
                  <Label for="shortName" align="left">公司简称:</Label>
                  <TextBox inputId="shortName" name="shortName" v-model="company.shortName"
                           v-validate="'required|max:5'" placeholder="请输入公司简称"/>
                  <div class="error">{{ errors.first('shortName') }}</div>
                </div>

                <div style="float: left;margin-bottom:10px">
                  <Label for="code" align="left">公司编号:</Label>
                  <TextBox inputId="code" name="code" v-model="company.code" v-validate="'required|alpha_num'"
                           placeholder="请输入公司编号"/>
                  <div class="error">{{ errors.first('code') }}</div>
                </div>
                <div style="float: right;margin-bottom:10px">
                  <Label for="email" align="left">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="company.email"
                           placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>

                <div style="float: left;margin-bottom:10px">
                  <Label for="hero" align="left">公司类型:</Label>
                  <ComboBox inputId='companyType' name="companyType" :data="companyType" v-validate="'required'"
                            v-model="company.companyType"></ComboBox>
                  <div class="error">{{ errors.first('companyType') }}</div>
                </div>
                <div style="float: right;margin-bottom:10px">
                  <Label for="parentCompany" align="left">所属公司:</Label>
                  <ComboTree name='parentCompany'  :data="companyList" v-model="company.parent" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ errors.first('parentCompany') }}</div>
                </div>

                <div style="margin-bottom:10px">
                  <Label for="remark" align="left">备注:</Label>
                  <TextBox inputId="t2"  name="remark" :multiline="true" :value="description" style="width:83%;height:120px;"></TextBox>
                  <div class="error">{{ errors.first('remark') }}</div>
                </div>

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
        total: 0,
        pageNumber: 1,
        pageSize: 20,
        data: null,
        footerData: null,
        checkedIds: [],
        pageList: [10, 20, 30, 40, 50],
        loading: false,
        pagePosition: "bottom",
        company: {
          name: null,
          shortName: null,
          code: null,
          email: null,
          companyType: null,
          parent: null
        },
        companyType: [
          {value: 11, text: "总公司"},
          {value: 12, text: "分公司"},
          {value: 13, text: "本部"},
          {value: 20, text: "中支公司"}
        ],
        companyList: [
          {
            id: 1,
            text: "XX集团",
            children: [
              {
                id: 11,
                text: "北京分公司",
                state: "closed",
                children: [
                  {
                    id: 111,
                    text: "海淀营业部"
                  },
                  {
                    id: 112,
                    text: "朝阳营业部"
                  },
                  {
                    id: 113,
                    text: "东城营业部"
                  }
                ]
              },
              {
                id: 12,
                text: "上海分公司",
                children: [
                  {
                    id: 121,
                    text: "浦东营业部"
                  },
                  {
                    id: 122,
                    text: "闽西营业部"
                  },
                  {
                    id: 123,
                    text: "上海滩营业部"
                  }
                ]
              },
              {
                id: 13,
                text: "河北分公司"
              },
              {
                id: 14,
                text: "石家庄营业部"
              },
              {
                id: 15,
                text: "邯郸营业部"
              }
            ]
          }
        ]
      };
    },
    created() {
      this.data = this.getData();
      this.footerData =  {
        name: "Total Size:",
        size: 999
      };
    },
    methods: {
      getData() {
        return [
            {
              id: 1,
              name: "C",
              size: "",
              date: "02/19/2010",
              children: [
                {
                  id: 2,
                  name: "Program Files",
                  size: "120 MB",
                  date: "03/20/2010",
                  children: [
                    {
                      id: 21,
                      name: "Java",
                      size: "",
                      date: "01/13/2010",
                      state: "closed",
                      children: [
                        {
                          id: 211,
                          name: "java.exe",
                          size: "142 KB",
                          date: "01/13/2010"
                        },
                        {
                          id: 212,
                          name: "jawt.dll",
                          size: "5 KB",
                          date: "01/13/2010"
                        }
                      ]
                    },
                    {
                      id: 22,
                      name: "MySQL",
                      size: "",
                      date: "01/13/2010",
                      state: "closed",
                      children: [
                        {
                          id: 221,
                          name: "my.ini",
                          size: "10 KB",
                          date: "02/26/2009"
                        },
                        {
                          id: 222,
                          name: "my-huge.ini",
                          size: "5 KB",
                          date: "02/26/2009"
                        },
                        {
                          id: 223,
                          name: "my-large.ini",
                          size: "5 KB",
                          date: "02/26/2009"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 3,
                  name: "eclipse",
                  size: "",
                  date: "01/20/2010",
                  children: [
                    {
                      id: 31,
                      name: "eclipse.exe",
                      size: "56 KB",
                      date: "05/19/2009"
                    },
                    {
                      id: 32,
                      name: "eclipse.ini",
                      size: "1 KB",
                      date: "04/20/2010"
                    },
                    {
                      id: 33,
                      name: "notice.html",
                      size: "7 KB",
                      date: "03/17/2005"
                    }
                  ]
                }
              ]
            }
          ];
      },
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize);
      },
      loadPage(pageNumber, pageSize) {
        this.loading = true;
        setTimeout(() => {
          this.$http.post("/org/company", {
              pageNumber: 1,
              pageSize: 20
            }
          ).then((response) => {
            //console.log("--->", response.data);
            let result = response.data;
            this.total = result.total;
            this.pageNumber = result.pageNumber;
            this.data = result.rows;
            this.loading = false;
          }).catch(error => {
            console.log("error", error);
          });
        }, 1000);
      },
      remove() {
        console.log("del");
        if (this.checkedIds.length <= 0) {
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
      selected(event) {
        this.checkedIds = [];
        let _this = this;
        event.forEach(function (item, i) {
          _this.checkedIds.push(item.inv);
        });
      },
      checkAll(event) {
        if (event.currentTarget.checked) {
          this.checkedIds = [];
          let _this = this;
          this.data.forEach(function (item, i) {
            _this.checkedIds.push(item.inv);
          });
        } else {
          this.checkedIds = [];
        }
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.company))
            this.$http.post("/org/company", this.company).then((response) => {
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
