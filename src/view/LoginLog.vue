<!-- 1.模板 :html 结构-->
<template>
  <div>
      <Layout>
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">
          <Panel title="查询条件" :collapsible="true" :bodyStyle="{padding:'10px',marginBottom:'5px'}">
            <Form :model="loginLog" :labelWidth="120" labelAlign="right">
              <div style="margin-bottom:10px">
                <Label for="n1" align="right">用户名：</Label>
                <TextBox inputId="username" name="username" v-model="loginLog.username"></TextBox>

                <Label for="d2" align="right">日期： </Label>
                <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateFrom"
                         v-model="loginLog.createDateFrom"></DateBox>
                至
                <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateTo" v-model="loginLog.createDateTo"></DateBox>
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
                  <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                  <LinkButton iconCls="icon-print" :plain="true" @click="print()">打印</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true" @click="goBack()"></LinkButton>
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

              <GridColumn v-for="column in displayColumns" :key="column.id" :field="column.field" :title="column.title"
                          v-if="column.visible" :align="column.align" :sortable="column.sortable" :width="column.width">
              </GridColumn>
            </DataGrid>
          </Panel>
        </LayoutPanel>
      </Layout>
  </div>
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
        loginLog: {}
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
        this.$api.login.log({
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
            if (item.visible) {
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
        for (let field in this.loginLog) {
          let filter = {};
          if (field.endsWith("From")) {
            filter.property = field.substr(0, field.indexOf("From"));
            filter.operator = "greaterThanOrEqualTo";
            filter.value = dateFmt(this.loginLog[field]);
          } else if (field.endsWith("To")) {
            filter.property = field.substr(0, field.indexOf("To"));
            filter.operator = "lessThanOrEqualTo";
            filter.value =  dateFmt(this.loginLog[field],1);
          } else {
            filter.property = field;
            filter.operator = "like";
            filter.value = this.loginLog[field];
          }
          filters.push(filter);
        }
        this.loadPage(this.pageNumber, this.pageSize, filters);
      },
      reset() {
        this.loginLog = {};
      },
      edit() {
        if (this.checkedIds.length === 1) {
          //path来匹配路由，然后通过query来传递参数
          this.$router.push({path: '/org/loginLog/add?id=' + this.checkedIds[0]});
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
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
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .error {
    margin: 4px 0 0 80px;
  }

  .dataList {
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
