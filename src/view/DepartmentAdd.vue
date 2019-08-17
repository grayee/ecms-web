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
      <Layout style="height:100%" >
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="department" :labelAlign="right">
            <div class="main">
            <div class="divRow">
              <div>
                <Label for="name" align="right">部门名称:</Label>
                <TextBox inputId="name" name="name" v-model="department.departmentName" v-validate="'required|min:5'"
                         style="width:18em" placeholder="请输入部门名称"/>
                <div class="error">{{ errors.first('name') }}</div>
              </div>
              <div>
                <Label for="shortName" align="right">部门简称:</Label>
                <TextBox inputId="shortName" name="shortName" v-model="department.shortName"
                         v-validate="'required|max:10'" style="width:18em" placeholder="请输入部门简称"/>
                <div class="error">{{ errors.first('shortName') }}</div>
              </div>
            </div>
            <div class="divRow">
                <div>
                  <Label for="code" align="right">部门编号:</Label>
                  <TextBox inputId="code" name="code" v-model="department.departmentNo" v-validate="'required|alpha_num'"
                           placeholder="请输入部门编号"/>
                  <div class="error">{{ errors.first('code') }}</div>
                </div>
                <div>
                  <Label for="departmentFlag" align="right">部门标识:</Label>
                  <TextBox inputId="departmentFlag" v-validate="'required'" name="departmentFlag" v-model="department.departmentFlag"
                           style="width:18em" placeholder="请输入部门标识"></TextBox>
                  <div class="error">{{ errors.first('departmentFlag') }}</div>
                </div>
            </div>
            <div class="divRow">
              <div>
                <Label for="hero" align="right">部门类型:</Label>
                <ComboBox inputId='departmentType' name="departmentType" :data="departmentType" v-validate="'required'"
                          v-model="department.departmentType"></ComboBox>
                <div class="error">{{ errors.first('departmentType') }}</div>
              </div>
              <div>
                <Label for="parentdepartment" align="right">所属部门:</Label>
                <ComboTree name='parentdepartment' :data="departmentList" v-model="department.parentId"  placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <div class="error">{{ errors.first('parentdepartment') }}</div>
              </div>
            </div>
              <div class="divRow">
                <div>
                  <Label for="fax" align="right">传真地址:</Label>
                  <TextBox inputId="fax" name="fax" v-model="department.fax" v-validate="'required|alpha_num'"
                           placeholder="请输入传真地址"/>
                  <div class="error">{{ errors.first('fax') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="department.email"
                           style="width:18em" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>
              </div>
            <div class="divRow">
              <div>
                <Label for="linkMan" align="right">联系人:</Label>
                <TextBox inputId="linkMan" name="linkMan" v-model="department.linkMan"
                         v-validate="'required|max:20'" style="width:18em" placeholder="请输入联系人"/>
                <div class="error">{{ errors.first('linkMan') }}</div>
              </div>

              <div>
                <Label for="tel" align="right">联系电话:</Label>
                <TextBox inputId="tel" name="tel" v-model="department.tel"
                         v-validate="'required|max:11'" placeholder="请输入联系电话"/>
                <div class="error">{{ errors.first('tel') }}</div>
              </div>
            </div>

              <div class="divRow">
                <div>
                  <Label for="webSite" align="right">部门网址:</Label>
                  <TextBox inputId="webSite" name="webSite" v-model="department.webSite"
                           v-validate="'required|max:100'" style="width:18em" placeholder="请输入部门网址"/>
                  <div class="error">{{ errors.first('webSite') }}</div>
                </div>
                <div>
                  <Label for="address" align="right">部门地址:</Label>
                  <TextBox inputId="t2" name="address"   v-model="department.address"
                           v-validate="'required|max:200'" style="width:20em"  placeholder="请输入部门地址"></TextBox>
                  <div class="error">{{ errors.first('address') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true"  v-model="department.remark"
                           style="width:73%;height:120px;"></TextBox>
                  <div class="error">{{ errors.first('remark') }}</div>
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
      getOrgRelation(){
        this.$api.org.getRelationTree('').then((response)=>{
          if(response.status===200){
            this.departmentList = response.data.data;
            console.log(this.departmentList);
          }
          return true;
        }).then((result)=>{
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.department.departmentDetail(detailId).then((response) => {
              this.department = response.data.data;
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            this.department={};
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
            this.$api.department.departmentAdd(this.department).then((response) => {
              if (this.$route.params.pid != null|| this.$route.query.orgId != null) {
                this.$router.go(-1);
              } else {
                this.$router.push({path: '/org/department'});
              }
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
    margin: 2px 120px;
  }
  .main{
    padding: 20px;
  }
  .divRow{
    overflow: auto;
  }
  .divRow > div {
    width: 48%;
    float: left;
    padding: 3px;
  }
  .formBtn{
    text-align:center;
    clear: both;
    padding: 20px;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
