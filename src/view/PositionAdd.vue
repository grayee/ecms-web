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
        <li class="active">岗位管理</li>
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

          <Form ref="form" :model="position" :labelAlign="right">
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="positionName" align="right">岗位名称:</Label>
                  <TextBox inputId="positionName" name="positionName" v-model="position.positionName" v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="岗位名称" placeholder="请输入岗位名称"/>
                  <div class="error">{{ errors.first('positionName') }}</div>
                </div>
                <div>
                  <Label for="shortName" align="right">岗位简称:</Label>
                  <TextBox inputId="shortName" name="shortName" v-model="position.shortName"
                           v-validate="'required|max:10'" style="width:18em" data-vv-as="岗位简称" placeholder="请输入岗位简称"/>
                  <div class="error">{{ errors.first('shortName') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="positionNo" align="right">岗位编号:</Label>
                  <TextBox inputId="positionNo" name="positionNo" v-model="position.positionNo" v-validate="'alpha_num'"
                           data-vv-as="岗位编号" placeholder="请输入岗位编号"/>
                  <div class="error">{{ errors.first('positionNo') }}</div>
                </div>
                <div>
                  <Label for="positionFlag" align="right">岗位标识:</Label>
                  <TextBox inputId="positionFlag" v-validate="'required'" name="positionFlag"
                           v-model="position.positionFlag"
                           style="width:18em" data-vv-as="岗位标识" placeholder="请输入岗位标识"></TextBox>
                  <div class="error">{{ errors.first('positionFlag') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="hero" align="right">岗位类型:</Label>
                  <ComboBox inputId='positionType' name="positionType" :data="positionType" v-validate="'required'"
                            data-vv-as="岗位类型" v-model="position.positionType"></ComboBox>
                  <div class="error">{{ errors.first('positionType') }}</div>
                </div>
                <div>
                  <Label for="parentposition" align="right">所属岗位:</Label>
                  <ComboTree name='parentposition' :data="positionList" v-model="position.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ errors.first('parentposition') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="fax" align="right">传真地址:</Label>
                  <TextBox inputId="fax" name="fax" v-model="position.fax" v-validate="'required|alpha_num'"
                           data-vv-as="传真地址" placeholder="请输入传真地址"/>
                  <div class="error">{{ errors.first('fax') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="position.email"
                           style="width:18em" data-vv-as="电子邮件" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ errors.first('email') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="linkMan" align="right">联系人:</Label>
                  <TextBox inputId="linkMan" name="linkMan" v-model="position.linkMan"
                           v-validate="'required|max:20'" style="width:18em" data-vv-as="联系人" placeholder="请输入联系人"/>
                  <div class="error">{{ errors.first('linkMan') }}</div>
                </div>

                <div>
                  <Label for="mobilePhone" align="right">联系人电话:</Label>
                  <TextBox inputId="mobilePhone" name="mobilePhone" v-model="position.mobilePhone"
                           v-validate="'required|max:11'" data-vv-as="联系人电话" placeholder="请输入联系人电话"/>
                  <div class="error">{{ errors.first('mobilePhone') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="webSite" align="right">岗位网址:</Label>
                  <TextBox inputId="webSite" name="webSite" v-model="position.webSite"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="岗位网址" placeholder="请输入岗位网址"/>
                  <div class="error">{{ errors.first('webSite') }}</div>
                </div>
                <div>
                  <Label for="address" align="right">岗位地址:</Label>
                  <TextBox inputId="t2" name="address" v-model="position.address"
                           v-validate="'required|max:200'" style="width:20em" data-vv-as="岗位地址"
                           placeholder="请输入岗位地址"></TextBox>
                  <div class="error">{{ errors.first('address') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="telPhone" align="right">座机电话:</Label>
                  <TextBox inputId="telPhone" name="telPhone" v-model="position.telPhone"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="座机电话" placeholder="请输入座机电话"/>
                  <div class="error">{{ errors.first('telPhone') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="position.remark"
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
        position: {},
        positionType: [
          {value: 0, text: "总岗位"},
          {value: 1, text: "分岗位"},
          {value: 2, text: "中支岗位"},
          {value: 3, text: "本部"}
        ],
        positionList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('1').then((response) => {
          if (response.status === 200) {
            this.positionList = response.data.data;
          }
          return true;
        }).then((result) => {
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.position.positionDetail(detailId).then((response) => {
              this.position = response.data.data;
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            this.position = {};
            //组织机构新增
            this.position.parentId = this.$route.params.pid;
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
              this.$api.position.positionUpt(this.position).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            } else {
              this.$api.position.positionAdd(this.position).then((response) => {
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
