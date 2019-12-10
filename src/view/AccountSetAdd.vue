<!-- 1.模板 :html 结构-->
<template>
  <div>
      <Layout style="height:100%">
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="accountSet" >
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="accountSetName" align="right">账套名称:</Label>
                  <TextBox inputId="accountSetName" name="accountSetName" v-model="accountSet.accountSetName" v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="账套名称" placeholder="请输入账套名称"/>
                  <div class="error">{{ veeErrors.first('accountSetName') }}</div>
                </div>
                <div>
                  <Label for="shortName" align="right">账套简称:</Label>
                  <TextBox inputId="shortName" name="shortName" v-model="accountSet.shortName"
                           v-validate="'required|max:10'" style="width:18em" data-vv-as="账套简称" placeholder="请输入账套简称"/>
                  <div class="error">{{ veeErrors.first('shortName') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="accountSetNo" align="right">账套编号:</Label>
                  <TextBox inputId="accountSetNo" name="accountSetNo" v-model="accountSet.accountSetNo" v-validate="'alpha_num'"
                           data-vv-as="账套编号" placeholder="请输入账套编号"/>
                  <div class="error">{{ veeErrors.first('accountSetNo') }}</div>
                </div>
                <div>
                  <Label for="accountSetFlag" align="right">账套标识:</Label>
                  <TextBox inputId="accountSetFlag" v-validate="'required'" name="accountSetFlag"
                           v-model="accountSet.accountSetFlag"
                           style="width:18em" data-vv-as="账套标识" placeholder="请输入账套标识"></TextBox>
                  <div class="error">{{ veeErrors.first('accountSetFlag') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="hero" align="right">账套类型:</Label>
                  <ComboBox inputId='accountSetType' name="accountSetType" :data="accountSetType" v-validate="'required'"
                            data-vv-as="账套类型" v-model="accountSet.accountSetType"></ComboBox>
                  <div class="error">{{ veeErrors.first('accountSetType') }}</div>
                </div>
                <div>
                  <Label for="parentaccountSet" align="right">所属账套:</Label>
                  <ComboTree name='parentaccountSet' :data="accountSetList" v-model="accountSet.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ veeErrors.first('parentaccountSet') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="fax" align="right">传真地址:</Label>
                  <TextBox inputId="fax" name="fax" v-model="accountSet.fax" v-validate="'required|alpha_num'"
                           data-vv-as="传真地址" placeholder="请输入传真地址"/>
                  <div class="error">{{ veeErrors.first('fax') }}</div>
                </div>
                <div>
                  <Label for="email" align="right">电子邮件:</Label>
                  <TextBox inputId="email" v-validate="'required|email'" name="email" v-model="accountSet.email"
                           style="width:18em" data-vv-as="电子邮件" placeholder="请输入邮件地址"></TextBox>
                  <div class="error">{{ veeErrors.first('email') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="linkMan" align="right">联系人:</Label>
                  <TextBox inputId="linkMan" name="linkMan" v-model="accountSet.linkMan"
                           v-validate="'required|max:20'" style="width:18em" data-vv-as="联系人" placeholder="请输入联系人"/>
                  <div class="error">{{ veeErrors.first('linkMan') }}</div>
                </div>

                <div>
                  <Label for="mobilePhone" align="right">联系人电话:</Label>
                  <TextBox inputId="mobilePhone" name="mobilePhone" v-model="accountSet.mobilePhone"
                           v-validate="'required|max:11'" data-vv-as="联系人电话" placeholder="请输入联系人电话"/>
                  <div class="error">{{ veeErrors.first('mobilePhone') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="webSite" align="right">账套网址:</Label>
                  <TextBox inputId="webSite" name="webSite" v-model="accountSet.webSite"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="账套网址" placeholder="请输入账套网址"/>
                  <div class="error">{{ veeErrors.first('webSite') }}</div>
                </div>
                <div>
                  <Label for="address" align="right">账套地址:</Label>
                  <TextBox inputId="t2" name="address" v-model="accountSet.address"
                           v-validate="'required|max:200'" style="width:20em" data-vv-as="账套地址"
                           placeholder="请输入账套地址"></TextBox>
                  <div class="error">{{ veeErrors.first('address') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="telPhone" align="right">座机电话:</Label>
                  <TextBox inputId="telPhone" name="telPhone" v-model="accountSet.telPhone"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="座机电话" placeholder="请输入座机电话"/>
                  <div class="error">{{ veeErrors.first('telPhone') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="accountSet.remark"
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
  </div>
</template>

<!-- 2.行为 :处理逻辑-->
<script>
  export default {
    data() {
      return {
        loading: false,
        accountSet: {},
        accountSetType: [
          {value: 0, text: "总账套"},
          {value: 1, text: "分账套"},
          {value: 2, text: "中支账套"},
          {value: 3, text: "本部"}
        ],
        accountSetList: []
      };
    },
    created() {
      this.getOrgRelation();
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('1').then((response) => {
          if (response.status === 200) {
            this.accountSetList = response.data.data;
          }
          return true;
        }).then((result) => {
          if (this.$route.query.id != null || this.$route.query.orgId != null) {
            let detailId = this.$route.query.id;
            if (detailId == null || this.$route.query.orgId != null) {
              detailId = this.$route.query.orgId;
            }
            //编辑
            this.$api.accountSet.accountSetDetail(detailId).then((response) => {
              this.accountSet = response.data.data;
            }).catch(error => {
              console.log("get menu detail error", error);
            });
          }
          if (this.$route.params.pid != null) {
            this.accountSet = {};
            //组织机构新增
            this.accountSet.parentId = this.$route.params.pid;
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
              this.$api.accountSet.accountSetUpt(this.accountSet).then((response) => {
                this.$router.go(-1);
              }).catch(error => {
                this.$messager.alert({title: "错误信息", icon: "error", msg: error.data.message});
              });
            } else {
              this.$api.accountSet.accountSetAdd(this.accountSet).then((response) => {
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
