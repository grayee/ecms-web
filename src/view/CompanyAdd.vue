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
      <Layout style="height:100%" >
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="company" :labelAlign="right">
            <div class="main">
            <div class="divRow">
              <div>
                <Label for="name" align="right">公司名称:</Label>
                <TextBox inputId="name" name="name" v-model="company.companyName" v-validate="'required|min:5'"
                         style="width:18em" placeholder="请输入公司名称"/>
                <div class="error">{{ errors.first('name') }}</div>
              </div>
              <div>
                <Label for="shortName" align="right">公司简称:</Label>
                <TextBox inputId="shortName" name="shortName" v-model="company.shortName"
                         v-validate="'required|max:5'" style="width:18em" placeholder="请输入公司简称"/>
                <div class="error">{{ errors.first('shortName') }}</div>
              </div>
            </div>
            <div class="divRow">
                <div>
                  <Label for="code" align="right">公司编号:</Label>
                  <TextBox inputId="code" name="code" v-model="company.companyNo" v-validate="'required|alpha_num'"
                           placeholder="请输入公司编号"/>
                  <div class="error">{{ errors.first('code') }}</div>
                </div>
                <div>
                  <Label for="companyFlag" align="right">公司标识:</Label>
                  <TextBox inputId="companyFlag" v-validate="'required'" name="companyFlag" v-model="company.companyFlag"
                           style="width:18em" placeholder="请输入公司标识"></TextBox>
                  <div class="error">{{ errors.first('companyFlag') }}</div>
                </div>
            </div>
            <div class="divRow">
              <div>
                <Label for="hero" align="right">公司类型:</Label>
                <ComboBox inputId='companyType' name="companyType" :data="companyType" v-validate="'required'"
                          v-model="company.companyType"></ComboBox>
                <div class="error">{{ errors.first('companyType') }}</div>
              </div>
              <div>
                <Label for="parentCompany" align="right">所属公司:</Label>
                <ComboTree name='parentCompany' :data="companyList" v-model="company.parentId" @click=""  placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <div class="error">{{ errors.first('parentCompany') }}</div>
              </div>
            </div>
              <div class="divRow">
                <div>
                  <Label for="fax" align="right">传真地址:</Label>
                  <TextBox inputId="fax" name="fax" v-model="company.fax" v-validate="'required|alpha_num'"
                           placeholder="请输入传真地址"/>
                  <div class="error">{{ errors.first('fax') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="company.email"
                           style="width:18em" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>
              </div>
            <div class="divRow">
              <div>
                <Label for="linkMan" align="right">联系人:</Label>
                <TextBox inputId="linkMan" name="linkMan" v-model="company.linkMan"
                         v-validate="'required|max:20'" style="width:18em" placeholder="请输入联系人"/>
                <div class="error">{{ errors.first('linkMan') }}</div>
              </div>

              <div>
                <Label for="tel" align="right">联系电话:</Label>
                <TextBox inputId="tel" name="tel" v-model="company.tel"
                         v-validate="'required|max:11'" placeholder="请输入联系电话"/>
                <div class="error">{{ errors.first('tel') }}</div>
              </div>
            </div>

              <div class="divRow">
                <div>
                  <Label for="webSite" align="right">公司网址:</Label>
                  <TextBox inputId="webSite" name="webSite" v-model="company.webSite"
                           v-validate="'required|max:100'" style="width:18em" placeholder="请输入公司网址"/>
                  <div class="error">{{ errors.first('webSite') }}</div>
                </div>
                <div>
                  <Label for="address" align="right">公司地址:</Label>
                  <TextBox inputId="t2" name="address"   v-model="company.address"
                           v-validate="'required|max:200'" style="width:20em"  placeholder="请输入公司地址"></TextBox>
                  <div class="error">{{ errors.first('address') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true"  v-model="company.remark" :value="description"
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
        company: {},
        companyType: [
          {value: 11, text: "总公司"},
          {value: 12, text: "分公司"},
          {value: 13, text: "本部"},
          {value: 20, text: "中支公司"}
        ],
        companyList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation(){
        this.$api.org.getRelationTree('').then((response)=>{
          console.log(response);
          if(response.status===200){
            this.companyList = response.data.data;
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
            this.$api.company.companyAdd(this.company).then((response) => {
              this.$router.push({path: '/org/company'});
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
