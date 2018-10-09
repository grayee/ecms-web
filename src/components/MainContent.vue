<!-- 1.模板 :html 结构-->
<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li class="active">
          <i class="fa fa-home" style="font-size: 20px; position: relative; top: 2px; left: -3px;"></i> &nbsp;首页
        </li>
        <li class="active">控制台</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="background: rgb(255, 255, 255); ">
      <!--------------------------
        | Your Page Content Here |
        -------------------------->

      <Panel title="标题" :collapsible="true" :bodyStyle="{padding:'5px'}" :headerStyle="{background: '#f5f5f5'}">
          <DataGrid style="height:100%"
                    :pagination="true"
                    :lazy="true"
                    :showPageList="true"
                    :pageList="pageList"
                    :data="data"
                    :total="total"
                    :loading="loading"
                    :pageNumber="pageNumber"
                    :pageSize="pageSize"
                    :pagePosition="pagePosition"
                    :tpl="tpl"
                    :pageLayout="['list','sep','first','prev','links','next','last','sep','refresh','info','tpl']"
                    @pageChange="onPageChange($event)">

            <div slot="tpl" slot-scope="{datagrid}">
              <NumberBox style="width:60px;height:30px"
                         v-model="datagrid.pageNumberState"
                         :min="1" :max="datagrid.pageCountState"
                         :inputStyle="{textAlign:'center'}">
              </NumberBox>
            </div>

            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="5%">
              <template slot="body" slot-scope="scope">
                {{scope.rowIndex + 1}}
              </template>
            </GridColumn>

            <GridColumn field="inv" title="Inv No"></GridColumn>
            <GridColumn field="name" title="Name"></GridColumn>
            <GridColumn field="amount" title="Amount" align="right" sortable="true"></GridColumn>
            <GridColumn field="price" title="Price" align="right" sortable="true"></GridColumn>
            <GridColumn field="cost" title="Cost" align="right"></GridColumn>
            <GridColumn field="note" title="Note"></GridColumn>
          </DataGrid>

      </Panel>

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
        pageSize: 20,
        data: [],
        pageList:[10,20,30,40,50],
        loading: false,
        pagePosition: "bottom",
        tpl:"<template slot-scope='scope'> " +
            "<NumberBox class='page-num' v-model='pageNumber' :min='1' :max='scope.pageCount'></NumberBox>" +
        "</template>",
        pageOptions: [
          {value: "bottom", text: "Bottom"},
          {value: "top", text: "Top"},
          {value: "both", text: "Both"}
        ]
      };
    },
    created() {
      this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
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
      }
    }
  };
</script>

<!-- 3.样式:解决样式     -->
<style scoped>
  .panel-header {
    background-color: #f5f5f5;
  }
</style>
<!--
https://www.cnblogs.com/wyguo/p/3556049.html
-->
