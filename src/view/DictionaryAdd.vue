<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;系統管理
        </li>
        <li class="active">字典管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <Layout>
        <LayoutPanel region="west" :bodyStyle="{padding:'3px'}" style="width:200px;">
          <Panel title="字典明细树" :bodyStyle="{padding:'3px',marginBottom:'5px',height: '100%'}">
            <Tree ref="tree" :data="dictValues" :checkbox="false" @selectionChange="selected($event)"></Tree>
          </Panel>
        </LayoutPanel>

        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Panel :bodyStyle="{padding:'3px'}">
            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px"></div>
                <div>
                  <LinkButton iconCls="icon-add" :plain="true" @click="add()">新增</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true" @click="remove()">删除</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true" @click="goBack()"></LinkButton>
                </div>
              </div>
            </template>

            <Form :model="dictValue" :labelWidth="120" labelAlign="right">
              <div class="main">
                <div class="divRow">
                  <div>
                    <Label for="code" align="right">编码:</Label>
                    <TextBox inputId="code" name="code" v-model="dictValue.code" v-validate="'required|min:5'"
                             style="width:18em" data-vv-as="编码" placeholder="请输入编码"/>
                    <div class="error">{{ errors.first('code') }}</div>
                  </div>
                </div>

                <div class="divRow">
                  <div>
                    <Label for="name" align="right">名称:</Label>
                    <TextBox inputId="name" name="name" v-model="dictValue.name"
                             v-validate="'required|max:10'" style="width:18em" data-vv-as="名称" placeholder="请输入名称"/>
                    <div class="error">{{ errors.first('name') }}</div>
                  </div>
                </div>

                <div class="divRow">
                  <Label for="enableStatus" align="right">状态:</Label>
                  <label>
                    <input type="radio" name="enableStatus" id="e1" value="1" v-model="dictValue.enableStatus" checked>
                    启用
                  </label>
                  <label>
                    <input type="radio" name="enableStatus" id="e0" value="0" v-model="dictValue.enableStatus"> 禁用
                  </label>
                </div>

                <div class="divRow">
                  <div>
                    <Label for="orderNo" align="right">显示序号:</Label>
                    <NumberBox inputId="name" name="orderNo" v-model="dictValue.orderNo" :spinners="true"
                               :value="1" v-validate="'max:3'" style="width:8em" data-vv-as="显示序号"
                               placeholder="请输入显示序号"></NumberBox>
                    <div class="error">{{ errors.first('orderNo') }}</div>
                  </div>
                </div>

                <div class="divRow">
                  <div>
                    <Label for="description" align="right">备注:</Label>
                    <TextBox inputId="t2" name="description" :multiline="true" v-model="dictValue.description"
                             style="width:30%;height:120px;"></TextBox>
                    <div class="error">{{ errors.first('description') }}</div>
                  </div>
                </div>

                <div class="formBtn">
                  <LinkButton style="width:60px" @click="submitForm()">保存</LinkButton>
                </div>
              </div>
            </Form>
          </Panel>
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
        selectedId: null,
        dictValues: [],
        displayColumns: [],
        dictValue: {},
        subOrgTypes: [],
        curOrgType: null,
        loading: false
      };
    },
    created() {
      this.getValueTree();
    },
    methods: {
      getValueTree() {
        this.$api.dict.getValueTree(this.$route.query.id ).then((response) => {
          if (response.status === 200) {
            this.dictValues = response.data.data;
            console.log(this.dictValues);
            //this.$refs.tree.selectNode(this.dictValues[0]);
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      add(event) {
        let urlName;
        this.$router.push({name: urlName, params: {pid: this.selectedId}});
      },
      remove() {
        let orgId = this.dictValue.id;

      },
      selected(event) {
        this.selectedId = event.id;
        this.$api.org.getOrgDetail(this.selectedId).then((response) => {
          if (response.status === 200) {
            let result = response.data.data;
            this.displayColumns = result.extras.displayColumns;
            this.dictValue = result.content;
            this.subOrgTypes = result.extras.subOrgTypes;
            this.curOrgType = result.extras.curOrgType;
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {

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
    width: 100%;
    float: left;
    padding: 3px;
  }

  .formBtn {
    text-align: center;
    clear: both;
    padding: 20px;
  }

  .panel-header {
    background-color: #f5f5f5;
  }

  .panel {
    min-height: 500px;
  }
</style>
