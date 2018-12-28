<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;组织机构管理
        </li>
        <li class="active">公司管理</li>
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
                <div class="f-full" style="line-height:30px" >列表</div>
                <div>
                  <LinkButton iconCls="icon-add" :plain="true" @click="toAdd()" >新增</LinkButton>
                  <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                  <LinkButton iconCls="icon-print" :plain="true" @click="print()">打印</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true" @click="goBack()"></LinkButton>
                  <LinkButton iconCls="icon-filter" :plain="true" @click="$refs.d2.open()">调整显示列</LinkButton>
                </div>
              </div>
            </template>

            <DataGrid style="height:100%"
                      :pagination="true"
                      :lazy="true"
                      :pageList="pageList"
                      :data="data"
                      :total="total"
                      :loading="loading"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      :pagePosition="pagePosition"
                      :pageLinks="5"
                      :pageLayout="['list','sep','first','prev','sep','tpl','sep','next','last','sep','refresh','links','info']"
                      @pageChange="onPageChange($event)"
                      :selectionMode="'multiple'"
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
                          v-if="column.show" :align="column.align"  :sortable="column.sortable"
                          :width="column.width">
              </GridColumn>
            </DataGrid>
          </Panel>

          <Dialog ref="d2"
                  :title="'调整显示列'"
                  :dialogStyle="{width:'300px',height:'500px'}" :draggable="true" :closed="true"
                  :modal="true">

            <DataList style="width:100%;height:410px;" :data="displayColumns"
                      selectionMode="multiple"  @selectionChange="onSelectionChange($event)">
              <template slot-scope="scope">
                <div class="dataList">
                  <input type="checkbox" :value="scope.row.field" :id="scope.row.id" v-model="checkedFields" style="margin-bottom: 3px"/>
                  <label :for="scope.row.id">{{scope.row.title}}</label>
                </div>
              </template>
            </DataList>

            <div class="dialog-button">
              <LinkButton style="width:60px" @click="submitForm()">确认</LinkButton>
              <LinkButton style="width:60px" @click="$refs.d2.close()">取消</LinkButton>
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
        data: [],
        checkedIds: [],
        checkedFields: [],
        pageList: [10, 20, 30, 40, 50],
        loading: false,
        pagePosition: "bottom",
        selection:null,
        displayColumns:[
          {
            id:1,
            title:"公司编码",
            field:"code",
            width:"5%",
            show:true
          },
          {
            id:2,
            title:"公司名称",
            field:"name",
            width:"10%",
            show:true
          },{
            id:3,
            title:"公司简称",
            field:"shortName",
            width:"8%",
            show:true
          }, {
            id: 4,
            title: "公司地址",
            field: "address",
            width:"12%",
            show:true
          }, {
            id: 5,
            title: "公司邮编",
            field: "postcode",
            width:"8%",
            show:true
          }, {
            id: 6,
            title: "公司网址",
            field: "webSite",
            width:"12%",
            show:true
          }, {
            id: 7,
            title: "联系电话",
            field: "telPhone",
            width:"12%",
            show:true
          }, {
            id: 8,
            title: "邮件",
            field: "email",
            width:"12%",
            show:true
          }, {
            id: 9,
            title: "注册资本",
            field: "registeredCapital",
            width:"8%",
            align:"right",
            show:true
          }, {
            id: 10,
            title: "注册时间",
            field: "createTime",
            width:"8%",
            sortable:true,
            show:true
          }
        ],
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
      this.loadPage(this.pageNumber, this.pageSize);
      let _this = this;
      this.displayColumns.forEach(function (item, i) {
        _this.checkedFields.push(item.field);
      });
    },
    methods: {
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize);
      },
      loadPage(pageNumber, pageSize) {
        this.loading = true;
        setTimeout(() => {
          this.$api.company.companyList({
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
      goBack(){
        this.$router.go(-1);
      },
      toAdd(){
        this.$router.push({
          path: '/admin/company/add'
        });
      },
      onSelectionChange(event){
        this.checkedFields = [];
        let _this = this;
        event.forEach(function (item, i) {
          _this.checkedFields.push(item.field);
        });
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
      submitForm() {
        if (this.checkedFields.length <= 0) {
          alert("请至少选中一条数据");
        } else {
          let _this = this;
          this.checkedFields.forEach(function (item,i) {
            _this.displayColumns.forEach((column, i) => {
              column.show = column.field === item;
              console.log(column.field +"----"+ column.show)
            })
          })
        }
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .error {
    margin: 4px 0 0 80px;
  }
  Label {
    text-align: right;
    margin-left: 5px;
  }
  .dataList{
    display: flex;
    align-items: center;
    padding: 5px 10px;
    height: 35px;
    border-bottom: 1px solid #eee;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
