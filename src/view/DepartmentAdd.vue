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
        <li class="active">部门管理</li>
        <li class="active">新增</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <!--------------------------
        | Your Page Content Here |
        -------------------------->
      <Layout style="height:100%">
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="department" :labelAlign="right">
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="deptName" align="right">部门名称:</Label>
                  <TextBox inputId="deptName" name="deptName" v-model="department.deptName"
                           v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="部门名称" placeholder="请输入部门名称"/>
                  <div class="error">{{ veeErrors.first('deptName') }}</div>
                </div>
                <div>
                  <Label for="deptFlag" align="right">部门标识:</Label>
                  <TextBox inputId="deptFlag" v-validate="'required'" name="deptFlag" v-model="department.deptFlag"
                           style="width:18em" data-vv-as="部门标识" placeholder="请输入部门标识"></TextBox>
                  <div class="error">{{ veeErrors.first('deptFlag') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="deptNo" align="right">部门编码:</Label>
                  <TextBox inputId="code" name="deptNo" v-model="department.deptNo" placeholder="请输入部门编码"/>
                  <div class="error">{{ veeErrors.first('deptNo') }}</div>
                </div>
                <div>
                  <Label for="deptLevel" align="right">部门级别:</Label>
                  <TextBox inputId="deptLevel" v-validate="'required'" name="deptLevel" v-model="department.deptLevel"
                           style="width:18em" data-vv-as="部门级别" placeholder="部门级别"></TextBox>
                  <div class="error">{{ veeErrors.first('deptLevel') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="deptType" align="right">部门类型:</Label>
                  <ComboBox inputId='deptType' name="deptType" :data="departmentType" v-validate="'required'"
                            v-model="department.deptType"></ComboBox>
                  <div class="error">{{ veeErrors.first('departmentType') }}</div>
                </div>
                <div>
                  <Label for="parentId" align="right">所属机构:</Label>
                  <ComboTree name='parentId' :data="departmentList" v-model="department.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ veeErrors.first('parentId') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="deptLeader" align="right">部门领导:</Label>
                  <TextBox inputId="deptLeader" name="deptLeader" v-model="department.deptLeader"
                           v-validate="'required|max:20'" style="width:18em" data-vv-as="部门领导" placeholder="请输入部门领导"/>
                  <div class="error">{{ veeErrors.first('deptLeader') }}</div>
                </div>

                <div>
                  <Label for="foundDate" align="right">成立时间:</Label>
                  <DateBox inputId="foundDate" format="yyyy-MM-dd" name="foundDate"
                           v-model="department.foundDate" data-vv-as="成立时间" placeholder="请输入成立时间"></DateBox>

                  <div class="error">{{ veeErrors.first('foundDate') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="department.remark"
                           style="width:73%;height:120px;"></TextBox>
                  <div class="error">{{ veeErrors.first('remark') }}</div>
                </div>
              </div>
              <div class="formBtn">
                <LinkButton style="width:60px" @click="submitForm()">确认</LinkButton>
                <LinkButton style="width:60px" @click="goBack()">取消</LinkButton>
              </div>
            </div>
          </Form>

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
        loading: false,
        department: {},
        departmentType: [
          {value: 11, text: "总部门"},
          {value: 12, text: "分部门"},
          {value: 13, text: "本部"},
          {value: 20, text: "中支部门"}
        ],
        departmentList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('2').then((response) => {
          if (response.status === 200) {
            this.departmentList = response.data.data;
            console.log(this.departmentList);
          }
          return true;
        }).then((result) => {
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.department.departmentDetail(detailId).then((response) => {
              this.department = response.data.data;
              this.department.foundDate = Vue.filter('parseToDate')(this.department.foundDate);
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            this.department = {};
            //组织机构新增
            this.department.parentId = this.$route.params.pid;
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      goBack() {
        this.$router.go(-1)
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            let dateFmt = Vue.filter('dateFmt');
            this.department.foundDate = dateFmt(this.department.foundDate);
            if (this.$route.query.id != null || this.$route.query.orgId != null) {
              this.$api.department.departmentUpt(this.department).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            } else {
              this.$api.department.departmentAdd(this.department).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            }
          }
        })
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .error {
    margin: 2px 120px;
  }

  .main {
    padding: 20px;
  }

  .divRow {
    overflow: auto;
  }

  .divRow > div {
    width: 48%;
    float: left;
    padding: 3px;
  }

  .formBtn {
    text-align: center;
    clear: both;
    padding: 20px;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
