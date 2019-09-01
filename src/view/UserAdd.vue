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
        <li class="active">用户管理</li>
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

          <Form ref="form" :model="user" :labelAlign="right">
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="userName" align="right">用户名称:</Label>
                  <TextBox inputId="userName" name="userName" v-model="user.userName"
                           v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="用户名称" placeholder="请输入用户名称"/>
                  <div class="error">{{ errors.first('userName') }}</div>
                </div>
                <div>
                  <Label for="englishName" align="right">英文名称:</Label>
                  <TextBox inputId="englishName" name="englishName" v-model="user.englishName"
                           v-validate="'required|max:10'" style="width:18em" data-vv-as="英文名称" placeholder="请输入英文名称"/>
                  <div class="error">{{ errors.first('englishName') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="userNo" align="right">用户编号:</Label>
                  <TextBox inputId="userNo" name="userNo" v-model="user.userNo" v-validate="'alpha_num'"
                           data-vv-as="用户编号" placeholder="请输入用户编号"/>
                  <div class="error">{{ errors.first('userNo') }}</div>
                </div>
                <div>
                  <Label for="sex" align="right">性别:</Label>
                    <label>
                      <input type="radio" name="sex" id="male" value="male" v-model="user.sex" checked> 男
                    </label>
                    <label>
                      <input type="radio" name="sex" id="female" value="female" v-model="user.sex" >女
                    </label>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="hero" align="right">用户类型:</Label>
                  <ComboBox inputId='userType' name="userType" :data="userType" v-validate="'required'"
                            data-vv-as="用户类型" v-model="user.userType"></ComboBox>
                  <div class="error">{{ errors.first('userType') }}</div>
                </div>
                <div>
                  <Label for="parentId" align="right">所属机构:</Label>
                  <ComboTree name='parentId' :data="userList" v-model="user.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ errors.first('parentId') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="telPhone" align="right">电话:</Label>
                  <TextBox inputId="telPhone" name="telPhone" v-model="user.telPhone" v-validate="'required|alpha_num'"
                           data-vv-as="电话" placeholder="电话"/>
                  <div class="error">{{ errors.first('telPhone') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="user.email"
                           style="width:18em" data-vv-as="电子邮件" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="mobilePhone" align="right">手机号码:</Label>
                  <TextBox inputId="mobilePhone" name="mobilePhone" v-model="user.mobilePhone"
                           v-validate="'required|max:11'" data-vv-as="手机号码" placeholder="请输入手机号码"/>
                  <div class="error">{{ errors.first('mobilePhone') }}</div>
                </div>
                <div>
                  <Label for="postalCode" align="right">邮编:</Label>
                  <TextBox inputId="postalCode" name="postalCode" v-model="user.postalCode"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="邮编" placeholder="请输入邮编"/>
                  <div class="error">{{ errors.first('postalCode') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="address" align="right">联系地址:</Label>
                  <TextBox inputId="t2" name="address" v-model="user.address"
                           v-validate="'required|max:200'" style="width:20em" data-vv-as="联系地址"
                           placeholder="请输入联系地址"></TextBox>
                  <div class="error">{{ errors.first('address') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="user.remark"
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
        user: {sex:"male"},
        userType: [
          {value: 0, text: "非正式"},
          {value: 1, text: "正式"},
          {value: 2, text: "临时"},
          {value: 3, text: "其他"}
        ],
        sex: [
          {value: 0, text: "男"},
          {value: 1, text: "女"}
          ],
        userList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('4').then((response) => {
          if (response.status === 200) {
            this.userList = response.data.data;
          }
          return true;
        }).then((result) => {
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.user.userDetail(detailId).then((response) => {
              this.user = response.data.data;
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            //组织机构新增
            this.user.parentId = this.$route.params.pid;
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
              this.$api.user.userUpt(this.user).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            } else {
              this.$api.user.userAdd(this.user).then((response) => {
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
