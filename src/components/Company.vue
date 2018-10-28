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
              <Label for="d2" >日期： </Label>
              <DateBox inputId="d2"  format="yyyy-MM-dd"></DateBox>
              至
              <DateBox inputId="d2" format="yyyy-MM-dd"></DateBox>
              <Label for="c1" >条件1: </Label>
              <ComboBox inputId="c1"  :data="data"></ComboBox>
            </div>
            <div style="margin-bottom:10px">
              <div style="float: left">
                <Label for="name" >条件2:</Label>
                <TextBox inputId="name"></TextBox>
                <Label for="n1" >条件3:</Label>
                <NumberBox inputId="n1" :value="100" :spinners="true"></NumberBox>
              </div>
              <div style="float: right">
                <LinkButton iconCls="icon-search" style="width:80px" >查询</LinkButton>
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
                  <input type="checkbox" @click="checkAll($event)" />
                </template>
                <template slot="body" slot-scope="scope">
                  <input type="checkbox" v-model="checkedIds" :value="scope.row.inv"/>
                </template>
              </GridColumn>

              <GridColumn align="center" cellCss="datagrid-td-rownumber" width="5%">
                <template slot="header" slot-scope="scope">
                  <span>序</span>
                </template>
                <template slot="body" slot-scope="scope">
                  {{scope.rowIndex + 1}}
                </template>
              </GridColumn>

              <GridColumn field="inv" title="Inv No"></GridColumn>
              <GridColumn field="name" title="Name"></GridColumn>
              <GridColumn field="amount" title="Amount" align="right" :sortable="true"></GridColumn>
              <GridColumn field="price" title="Price" align="right" :sortable="true"></GridColumn>
              <GridColumn field="cost" title="Cost" align="right"></GridColumn>
              <GridColumn field="note" title="Note"></GridColumn>
            </DataGrid>
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
                    <TextBox inputId="name" name="name" v-model="company.name" placeholder="请输入公司名称"/>

                  </div>
                  <div style="float: right;margin-bottom:10px">
                    <Label for="shortName" align="left">公司简称:</Label>
                    <TextBox inputId="shortName" name="shortName" v-model="company.shortName" placeholder="请输入公司简称"/>

                  </div>

                  <div style="float: left;margin-bottom:10px">
                    <Label for="code" align="left">公司编号:</Label>
                    <TextBox inputId="code" name="code" v-model="company.code" placeholder="请输入公司编号"/>

                  </div>
                  <div style="float: right;margin-bottom:10px">
                    <Label for="email" align="left">电子邮件:</Label>
                    <TextBox inputId="email" name="email" v-model="company.email" placeholder="请输入邮件地址"></TextBox>

                    <input v-validate="'required|email'" name="email" type="text">

                    <span>{{ errors.first('email') }}</span>
                  </div>

                  <div style="float: left;margin-bottom:10px">
                    <Label for="hero" align="left">Select:</Label>
                    <ComboBox inputId=hero name="hero" :data="heroes" v-model="company.hero"></ComboBox>

                  </div>
                  <div style="float: right;margin-bottom:10px">
                    <CheckBox inputId="accept" name="accept" v-model="company.accept"></CheckBox>
                    <Label for="accept">Accept Me</Label>
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
        data: [],
        checkedIds:[],
        pageList: [10, 20, 30, 40, 50],
        loading: false,
        pagePosition: "bottom",
        company: {
          name: null,
          shortName:null,
          code:null,
          email: null,
          hero: null,
          accept: false
        },
        heroes: [
          { value: 11, text: "Mr. Nice" },
          { value: 12, text: "Narco" },
          { value: 13, text: "Bombasto" },
          { value: 20, text: "Tornado" }
        ]
      };
    },
    created() {
      this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize);
      },
      loadPage(pageNumber, pageSize) {
        this.loading = true;
        setTimeout(() => {
          this.$http.post("/org/company", {
              pageNumber: 1,
              pageSize:20
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
      remove(){
        console.log("del");
        if (this.checkedIds.length <= 0) {
          this.$messager.alert({
            title: "提示信息",
            icon: "warning",
            msg: "请至少选中一条记录!"
          });
        }
      },
      edit(){
        console.log("edit");
      },
      refresh(){
        console.log("refresh");
      },
      print(){
        console.log("add");
      },
      selected(event){
        this.checkedIds = [];
        let _this = this;
        event.forEach(function(item, i) {
          _this.checkedIds.push(item.inv);
        });
      },
      checkAll(event){
        if(event.currentTarget.checked){
          this.checkedIds = [];
          let _this = this;
          this.data.forEach(function(item, i) {
            _this.checkedIds.push(item.inv);
          });
        }else{
          this.checkedIds = [];
        }
      },
      submitForm(){

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
