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
      <Layout>
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="company">
            <div class="main">
             <div>
                <Label for="name" align="left">公司名称:</Label>
                <TextBox inputId="name" name="name" v-model="company.name" v-validate="'required|min:5'"
                         placeholder="请输入公司名称"/>
                <div class="error">{{ errors.first('name') }}</div>
              </div>
              <div>
                <Label for="shortName" align="left">公司简称:</Label>
                <TextBox inputId="shortName" name="shortName" v-model="company.shortName"
                         v-validate="'required|max:5'" placeholder="请输入公司简称"/>
                <div class="error">{{ errors.first('shortName') }}</div>
              </div>

                <div>
                  <Label for="code" align="left">公司编号:</Label>
                  <TextBox inputId="code" name="code" v-model="company.code" v-validate="'required|alpha_num'"
                           placeholder="请输入公司编号"/>
                  <div class="error">{{ errors.first('code') }}</div>
                </div>
                <div>
                  <Label for="email" align="left">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="company.email"
                           placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>

              <div>
                <Label for="hero" align="left">公司类型:</Label>
                <ComboBox inputId='companyType' name="companyType" :data="companyType" v-validate="'required'"
                          v-model="company.companyType"></ComboBox>
                <div class="error">{{ errors.first('companyType') }}</div>
              </div>
              <div>
                <Label for="parentCompany" align="left">所属公司:</Label>
                <ComboTree name='parentCompany' :data="companyList" v-model="company.parent" placeholder="-请选择-">
                  <Tree slot="tree"></Tree>
                </ComboTree>
                <div class="error">{{ errors.first('parentCompany') }}</div>
              </div>

              <div>
                <Label for="remark" align="left">备注:</Label>
                <TextBox inputId="t2" name="remark" :multiline="true" :value="description"
                         style="width:83%;height:120px;"></TextBox>
                <div class="error">{{ errors.first('remark') }}</div>
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

    },
    methods: {

      edit() {
        console.log("edit");
      },
      refresh() {
        console.log("refresh");
      },
      print() {
        console.log("add");
      },
      goBack() {
        this.$router.go(-1)
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            console.log("commit json data:" + JSON.stringify(this.company))
            this.$api.company.companyAdd(this.company).then((response) => {
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
    margin: 4px 0 0 80px;
  }

  Label {
    text-align: right
  }
  .main{
    padding: 20px;
  }

  .main > div {
    width: 49%;
    float: left;
    padding: 5px;
  }
  .formBtn{
    clear: both;
    padding: 20px;
    margin-right: 20px;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
