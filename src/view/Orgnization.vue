<!-- 组织管理视图 -->
<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;首页
        </li>
        <li class="active">组织机构管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255);padding:5px">
      <Layout>
        <LayoutPanel region="west" :bodyStyle="{padding:'3px'}" style="width:150px;">
          <Panel title="组织机构树" :bodyStyle="{padding:'3px',marginBottom:'5px',height: '100%'}">
            <Tree :data="orgRelationData" :checkbox="false"></Tree>
          </Panel>
        </LayoutPanel>

        <LayoutPanel region="center" style="height:100%" :bodyStyle="{padding:'5px'}">

          <Panel title="详情" :bodyStyle="{padding:'3px'}">

            <template slot="header">
              <div class="f-row">
                <div class="f-full" style="line-height:30px">详情</div>
                <div>
                  <LinkButton iconCls="icon-add" :plain="true">新增</LinkButton>
                  <LinkButton iconCls="icon-reload" :plain="true">刷新</LinkButton>
                  <LinkButton iconCls="icon-remove" :plain="true">删除</LinkButton>
                  <LinkButton iconCls="icon-edit" :plain="true">编辑</LinkButton>
                  <LinkButton iconCls="icon-print" :plain="true">打印</LinkButton>
                  <LinkButton iconCls="icon-back" :plain="true"></LinkButton>
                </div>
              </div>
            </template>

            <DataList  :data="data"
                      selectionMode="single"  @selectionChange="selection=$event">
              <template slot-scope="scope">
                  <ul >
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                  </ul>
              </template>
            </DataList>

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
        total: 0,
        pageNumber: 1,
        pageSize: 1,
        data: [],
        checkedIds: [],
        orgRelationData: [],
        pageList: [10, 20, 30, 40, 50],
        loading: false,
        pagePosition: "bottom",
        pageOptions: [
          {value: "bottom", text: "Bottom"},
          {value: "top", text: "Top"},
          {value: "both", text: "Both"}
        ]
      };
    },
    created() {
      this.getOrgRelation();
      this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
      getOrgRelation() {
        this.$api.org.getRelationTree('').then((response) => {
          if (response.status === 200) {
            this.orgRelationData = response.data.data;
          }
        }).catch(error => {
          console.log("error", error);
        });
      },
      onPageChange(event) {
        this.loadPage(event.pageNumber, event.pageSize);
      },
      loadPage(pageNumber, pageSize) {
        this.loading = true;
        setTimeout(() => {
          let result = this.getData(pageNumber, pageSize);
          this.total = result.total;
          this.pageNumber = result.pageNumber;
          this.data = result.rows;
          this.loading = false;
        }, 1000);
      },
      getData(pageNumber, pageSize) {
        let total = 100000;
        let data = [];
        let start = (pageNumber - 1) * pageSize;
        for (let i = start + 1; i <= start + pageSize; i++) {
          let amount = Math.floor(Math.random() * 1000);
          let price = Math.floor(Math.random() * 1000);
          data.push({
            inv: "Inv No " + i,
            name: "Name " + i,
            amount: amount,
            price: price,
            cost: amount * price,
            note: "Note " + i
          });
        }
        return {
          total: total,
          pageNumber: pageNumber,
          pageSize: pageSize,
          rows: data
        };
      },
      checkAll(event) {
        if (event.currentTarget.checked) {
          this.checkedIds = [];
          let _this = this;
          this.data.forEach(function (item, i) {
            _this.checkedIds.push(item.inv);
          });
        } else {
          this.checkedIds = [];
        }
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .panel-header {
    background-color: #f5f5f5;
  }
  .panel{
    min-height: 600px;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
