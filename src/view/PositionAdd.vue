<!-- 1.模板 :html 结构-->
<template>
  <div>
      <Layout style="height:100%">
        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Form ref="form" :model="position" :labelAlign="right">
            <div class="main">
              <div class="divRow">
                <div>
                  <Label for="positionName" align="right">岗位名称:</Label>
                  <TextBox inputId="positionName" name="positionName" v-model="position.positionName" v-validate="'required|min:5'"
                           style="width:18em" data-vv-as="岗位名称" placeholder="请输入岗位名称"/>
                  <div class="error">{{ veeErrors.first('positionName') }}</div>
                </div>
                <div>
                  <Label for="positionNo" align="right">岗位编号:</Label>
                  <TextBox inputId="positionNo" name="positionNo" v-model="position.positionNo" v-validate="'alpha_num'"
                           data-vv-as="岗位编号" placeholder="请输入岗位编号"/>
                  <div class="error">{{ veeErrors.first('positionNo') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="positionFlag" align="right">岗位标识:</Label>
                  <TextBox inputId="positionFlag" v-validate="'required'" name="positionFlag"
                           v-model="position.positionFlag"
                           style="width:18em" data-vv-as="岗位标识" placeholder="请输入岗位标识"></TextBox>
                  <div class="error">{{ veeErrors.first('positionFlag') }}</div>
                </div>

                <div>
                  <Label for="positionLevel" align="right">岗位级别:</Label>
                  <TextBox inputId="positionLevel" name="positionLevel" v-model="position.positionLevel"
                           v-validate="'required|max:100'" style="width:18em" data-vv-as="岗位级别" placeholder="请输入岗位级别"/>
                  <div class="error">{{ veeErrors.first('positionLevel') }}</div>
                </div>
              </div>
              <div class="divRow">
                <div>
                  <Label for="positionType" align="right">岗位类型:</Label>
                  <ComboBox inputId='positionType' name="positionType" :data="positionType" v-validate="'required'"
                            data-vv-as="岗位类型" v-model="position.positionType"></ComboBox>
                  <div class="error">{{ veeErrors.first('positionType') }}</div>
                </div>
                <div>
                  <Label for="parentId" align="right">所属机构:</Label>
                  <ComboTree name='parentId' :data="positionList" v-model="position.parentId" placeholder="-请选择-">
                    <Tree slot="tree"></Tree>
                  </ComboTree>
                  <div class="error">{{ veeErrors.first('parentId') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="leaderFlag" align="right">领导标识:</Label>
                  <TextBox inputId="leaderFlag" name="leaderFlag" v-model="position.leaderFlag" v-validate="'required|max:5'"
                           style="width:18em" data-vv-as="领导标识" placeholder="请输入领导标识"/>

                  <div class="error">{{ veeErrors.first('leaderFlag') }}</div>
                </div>
              </div>

              <div class="divRow">
                <div>
                  <Label for="remark" align="right">备注:</Label>
                  <TextBox inputId="t2" name="remark" :multiline="true" v-model="position.remark"
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
        this.$api.org.getRelationTree('3').then((response) => {
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
