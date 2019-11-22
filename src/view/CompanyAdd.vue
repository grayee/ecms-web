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

          <Form ref="form" :model="company" >
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="companyName" align="right">公司名称:</Label>
                  <TextBox inputId="companyName" name="companyName" v-model="company.companyName" v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="公司名称" placeholder="请输入公司名称"/>
                  <div class="error">{{ veeErrors.first('companyName') }}</div>
                </div>
                <div>
                  <Label for="shortName" align="right">公司简称:</Label>
                  <TextBox inputId="shortName" name="shortName" v-model="company.shortName"
                           v-validate="'required|max:10'" style="width:18em" data-vv-as="公司简称" placeholder="请输入公司简称"/>
                  <div class="error">{{ veeErrors.first('shortName') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="companyNo" align="right">公司编号:</Label>
                  <TextBox inputId="companyNo" name="companyNo" v-model="company.companyNo" v-validate="'alpha_num'"
                           data-vv-as="公司编号" placeholder="请输入公司编号"/>
                  <div class="error">{{ veeErrors.first('companyNo') }}</div>
                </div>
                <div>
                  <Label for="companyFlag" align="right">公司标识:</Label>
                  <TextBox inputId="companyFlag" v-validate="'required'" name="companyFlag"
                           v-model="company.companyFlag"
                           style="width:18em" data-vv-as="公司标识" placeholder="请输入公司标识"></TextBox>
                  <div class="error">{{ veeErrors.first('companyFlag') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="hero" align="right">公司类型:</Label>
                  <ComboBox inputId='companyType' name="companyType" :data="companyType" v-validate="'required'"
                            data-vv-as="公司类型" v-model="company.companyType"></ComboBox>
                  <div class="error">{{ veeErrors.first('companyType') }}</div>
                </div>
                <div>
                  <Label for="parentCompany" align="right">所属公司:</Label>
                  <ComboTree name='parentCompany' :data="companyList" v-model="company.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ veeErrors.first('parentCompany') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="fax" align="right">传真地址:</Label>
                  <TextBox inputId="fax" name="fax" v-model="company.fax" v-validate="'required|alpha_num'"
                           data-vv-as="传真地址" placeholder="请输入传真地址"/>
                  <div class="error">{{ veeErrors.first('fax') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="company.email"
                           style="width:18em" data-vv-as="电子邮件" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ veeErrors.first('email') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="linkMan" align="right">联系人:</Label>
                  <TextBox inputId="linkMan" name="linkMan" v-model="company.linkMan"
                           v-validate="'required|max:20'" style="width:18em" data-vv-as="联系人" placeholder="请输入联系人"/>
                  <div class="error">{{ veeErrors.first('linkMan') }}</div>
                </div>

                <div>
                  <Label for="mobilePhone" align="right">联系人电话:</Label>
                  <TextBox inputId="mobilePhone" name="mobilePhone" v-model="company.mobilePhone"
                           v-validate="'required|max:11'" data-vv-as="联系人电话" placeholder="请输入联系人电话"/>
                  <div class="error">{{ veeErrors.first('mobilePhone') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="webSite" align="right">公司网址:</Label>
                  <TextBox inputId="webSite" name="webSite" v-model="company.webSite"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="公司网址" placeholder="请输入公司网址"/>
                  <div class="error">{{ veeErrors.first('webSite') }}</div>
                </div>
                <div>
                  <Label for="address" align="right">公司地址:</Label>
                  <TextBox inputId="t2" name="address" v-model="company.address"
                           v-validate="'required|max:200'" style="width:20em" data-vv-as="公司地址"
                           placeholder="请输入公司地址"></TextBox>
                  <div class="error">{{ veeErrors.first('address') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="telPhone" align="right">座机电话:</Label>
                  <TextBox inputId="telPhone" name="telPhone" v-model="company.telPhone"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="座机电话" placeholder="请输入座机电话"/>
                  <div class="error">{{ veeErrors.first('telPhone') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="company.remark"
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
        company: {},
        companyType: [
          {value: 0, text: "总公司"},
          {value: 1, text: "分公司"},
          {value: 2, text: "中支公司"},
          {value: 3, text: "本部"}
        ],
        companyList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('1').then((response) => {
          if (response.status === 200) {
            this.companyList = response.data.data;
          }
          return true;
        }).then((result) => {
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.company.companyDetail(detailId).then((response) => {
              this.company = response.data.data;
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            this.company = {};
            //组织机构新增
            this.company.parentId = this.$route.params.pid;
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
            if (this.$route.query.id != null || this.$route.query.orgId != null) {
              this.$api.company.companyUpt(this.company).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            } else {
              this.$api.company.companyAdd(this.company).then((response) => {
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
