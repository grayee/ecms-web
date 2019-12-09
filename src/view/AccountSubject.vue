<!-- 1.模板 :html 结构-->
<template>
  <div>
      <Layout>
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">
          <Tabs @tabSelect="tabSelect($event)">
            <TabPanel v-for="st in subjectTypes" :key="st.value" :title="st">
              <Panel :bodyStyle="{padding:'10px',marginBottom:'5px'}">
                <Form :model="subject" :labelWidth="120" labelAlign="right">

                  <div style="margin-bottom:10px">
                    <Label for="subjectCode" align="right">科目编码：</Label>
                    <TextBox inputId="subjectCode" name="subjectCode" v-model="subject.subjectCode"></TextBox>

                    <Label for="subjectName" align="right">科目名称：</Label>
                    <TextBox inputId="subjectName" name="subjectName" v-model="subject.subjectName"></TextBox>

                    <Label for="balanceDir" style="text-align: right">余额方向: </Label>
                    <ComboBox inputId="balanceDir" name="balanceDir" v-model="subject.balanceDir"
                              :data="[{value: 0, text: '借方'},{value: 1, text: '贷方'}]"></ComboBox>
                  </div>

                  <div style="margin-bottom:10px">

                    <Label for="d2" align="right">创建日期： </Label>
                    <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateFrom"
                             v-model="subject.createDateFrom"></DateBox>
                    至
                    <DateBox inputId="d2" format="yyyy-MM-dd" name="createDateTo"
                             v-model="subject.createDateTo"></DateBox>
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
                      <LinkButton iconCls="icon-add" :plain="true" @click="toAdd()">新增</LinkButton>
                      <LinkButton iconCls="icon-reload" :plain="true" @click="refresh()">刷新</LinkButton>
                      <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                      <LinkButton iconCls="icon-edit" :plain="true" @click="edit()">编辑</LinkButton>
                      <LinkButton iconCls="icon-edit" :plain="true" @click="editDetail()">详细</LinkButton>
                      <LinkButton iconCls="icon-back" :plain="true" @click="goBack()"></LinkButton>
                    </div>
                  </div>
                </template>

                <DataGrid style="height:100%" :pagination="true" :lazy="true" :pageList="pageList"
                          :data="data" :total="total" :loading="loading" :pageNumber="pageNumber"
                          :pageSize="pageSize" :pagePosition="pagePosition" :pageLinks="5"
                          :pageLayout="['list','sep','first','prev','sep','tpl','sep','next','last','sep','refresh','links','info']"
                          @pageChange="onPageChange($event)" :selectionMode="'multiple'"
                          @rowDblClick="editDetail($event)"
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
                              v-if="column.show" :align="column.align" :sortable="column.sortable"
                              :width="column.width">
                  </GridColumn>
                </DataGrid>
              </Panel>
            </TabPanel>
          </Tabs>


          <Dialog ref="d1" :title="subjectDialogTitle" :dialogStyle="{width:'480px',height:'540px'}"
                  bodyCls="f-column" :draggable="true" :closed="true" :modal="true" borderType="none">
            <div class="f-full form-horizontal" style="padding: 20px 60px 20px 20px">
              <Form ref="form" :model="subject">

                <Label for="subjectCode" align="right">科目编码:</Label>
                <TextBox inputId="subjectCode" name="subjectCode" v-model="subject.subjectCode" style="width:18em"
                         v-validate="'required|max:30'" data-vv-as="科目编码" placeholder="请输入科目编码"></TextBox>
                <div class="error">{{ veeErrors.first('subjectCode') }}</div>

                <Label for="subjectName" align="right">科目名称:</Label>
                <TextBox inputId="subjectName" name="subjectName" v-model="subject.subjectName" style="width:18em"
                         v-validate="'required|max:10'" data-vv-as="科目名称" placeholder="请输入科目名称"></TextBox>
                <span style="color: red; ">*</span>
                <div class="error">{{ veeErrors.first('subjectName') }}</div>

                <Label for="code" align="right">上级科目:</Label>
                <TextBox inputId="code" name="code" v-model="subject.code" style="width:18em"
                         v-validate="'required|max:30'" data-vv-as="上级科目" placeholder="请输入科目编码"></TextBox>
                <div class="error">{{ veeErrors.first('code') }}</div>

                <Label for="hero" align="right">科目类型:</Label>
                <ComboBox inputId='subjectType' name="subjectType" :data="subject.subjectTypeMap" v-validate="'required'"
                          data-vv-as="科目类型" v-model="subject.subjectType"></ComboBox>
                <div class="error">{{ veeErrors.first('subjectType') }}</div>

                <Label for="balanceDir" align="right">余额方向:</Label>
                <label v-for="(bd,index) in subject.balanceDirMap" :key="index">
                  <input type="radio" name="balanceDir" :value="bd.value" v-model="subject.balanceDir">{{bd.text}}
                </label>
                <div class="error">{{ veeErrors.first('balanceDir') }}</div>


                <fieldset>
                  <legend><input type="checkbox" name="isAssistCheck" v-model="subject.isAssistCheck"/> 辅助核算</legend>
                  <label v-for="(at,index) in subject.assistTypeMap" :key="index">
                    &nbsp;&nbsp;<input type="checkbox" name='assistTypes' :value='at.value'
                                       v-model="subject.assistTypes">&nbsp;{{at.text}} &nbsp;&nbsp;
                  </label>
                </fieldset>

                <fieldset>
                  <legend><input type="checkbox" name="isAmountCheck" v-model="subject.isAmountCheck"/> 数量核算</legend>
                  <Label for="code" align="right">计量单位:</Label>
                  <TextBox inputId="amountUnit" name="amountUnit" v-model="subject.amountUnit" style="width:10em"
                           v-validate="'required|max:30'" data-vv-as="计量单位" placeholder="请输入计量单位"></TextBox>
                  <div class="error" v-if="subject.isAmountCheck">{{ veeErrors.first('amountUnit') }}</div>

                </fieldset>

                <fieldset>
                  <legend><input type="checkbox" name="isForeignCurrencyCheck"
                                 v-model="subject.isForeignCurrencyCheck"/> 外币核算
                  </legend>
                  <Label for="hero" align="right">币 种:</Label>
                  <ComboBox inputId='currency' name="currency" :data="subject.currencyTypeMap" v-validate="'required'"
                            style="width:10em" data-vv-as="币种" v-model="subject.currency"></ComboBox>
                  <div class="error" v-if="subject.isForeignCurrencyCheck">{{ veeErrors.first('currency') }}</div>
                </fieldset>
              </Form>
            </div>
            <div class="dialog-button">
              <LinkButton style="width:60px" @click="confirm()&&$refs.d1.close()">确认</LinkButton>
              <LinkButton style="width:60px" @click="$refs.d1.close()">取消</LinkButton>
            </div>
          </Dialog>

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
        subjectType: 0,
        filters: [{property: "subjectType", operator: "equal", value: 1}],
        pagePosition: "bottom",
        displayColumns: [],
        subject: {},
        subjectTypes: null,
        subjectDialogTitle: "",
        selection: {}
      };
    },
    created() {
      this.loadPage(this.pageNumber, this.pageSize, this.filters);
    },
    computed:{

    },
    methods: {
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize, this.filters);
      },
      loadPage(pageNumber, pageSize, filters) {
        this.loading = true;
        this.$api.accounting.subjectList({
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
          this.subjectTypes = result.extras.subjectTypes;
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
        let dateFmt = Vue.filter('dateFmt');
        let eqFields = ["subjectType", "balanceDir"];
        this.filters = [];
        this.subject.subjectType = this.subjectType;
        for (let field in this.subject) {
          let filter = {};
          if (field.endsWith("From")) {
            filter.property = field.substr(0, field.indexOf("From"));
            filter.operator = "greaterThanOrEqualTo";
            filter.value = dateFmt(this.subject[field]);
          } else if (field.endsWith("To")) {
            filter.property = field.substr(0, field.indexOf("To"));
            filter.operator = "lessThanOrEqualTo";
            filter.value = dateFmt(this.subject[field], 1);
          } else {
            filter.property = field;
            filter.operator = "like";
            if (eqFields.indexOf(field) > -1) {
              filter.operator = "equal";
            }
            filter.value = this.subject[field];
          }
          this.filters.push(filter);
        }
        this.loadPage(this.pageNumber, this.pageSize, this.filters);
      },
      reset() {
        this.subject = {};
      },
      remove() {
        if (this.checkedIds.length > 0) {
          this.$api.dict.subjectDel(this.checkedIds).then((response) => {
            this.loadPage(this.pageNumber, this.pageSize);
          }).catch(error => {
            console.log("error", error);
          });
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
        }
      },
      edit() {
        if (this.checkedIds.length === 1) {
          this.subjectDialogTitle = "科目编辑";
          this.$api.accounting.subjectDetail(this.selection.id).then((response) => {
            this.subject = response.data.data;
            console.log(this.subject);
          }).catch(error => {
            console.log("get menu detail error", error);
          });
          this.$refs.d1.open();
        } else {
          this.$messager.alert({title: "提示信息", icon: "warning", msg: "请至少选中一条记录!"});
        }
      },
      editDetail(event) {
        if (event) {
          this.checkedIds.push(event.id);
        }
        if (this.checkedIds.length === 1) {
          this.$router.push({path: '/sys/dict/add?id=' + this.checkedIds[0]});
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
      toAdd() {
        this.subjectDialogTitle = "科目新增";
        this.$api.accounting.subjectDetail('').then((response) => {
          this.subject = response.data.data;
          console.log(this.subject);
        }).catch(error => {
          console.log("get menu detail error", error);
        });
        this.$refs.d1.open();
      },
      onRowClick(row) {
        if (this.checkedFields.indexOf(row.field) > -1) {
          delete this.checkedIds[this.checkedFields.indexOf(row.field)];
        } else {
          this.checkedFields.push(row.field);
        }
      },
      selected(event) {
        this.selection = event[0];
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
      confirm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.subject));
            if (this.subject.id) {
              this.$api.accounting.subjectUpt(this.subject).then((response) => {
                this.loadPage(event.pageNumber, event.pageSize);
                this.$refs.d1.close();
              }).catch(error => {
                console.log("error", error);
              });
            } else {
              this.$api.accounting.subjectAdd(this.subject).then((response) => {
                this.loadPage(event.pageNumber, event.pageSize);
                this.$refs.d1.close();
              }).catch(error => {
                console.log("error", error);
              });
            }
          }
        });
      },
      tabSelect(e) {
        this.subject = {};
        this.subjectType = e.title.value;
        this.filters = [{property: "subjectType", operator: "equal", value: this.subjectType}];
        this.loadPage(this.pageNumber, this.pageSize, this.filters);
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .error {
    margin: 0 120px;
    width: 120px;
  }

  .dataList {
    display: flex;
    align-items: center;
    padding: 3px 10px;
    height: 35px;
    border-bottom: 1px solid #eee;
  }

  fieldset {
    padding: .15em .825em .15em;
    margin: 0 2px 0 60px;
    border: 1px solid silver
  }

  legend {
    padding: .2em;
    border: 0;
    width: auto;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 1px
  }

</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
