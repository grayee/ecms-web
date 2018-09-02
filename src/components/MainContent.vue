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
      <div class="panel panel-default">
        <div class="panel-heading">基本信息</div>
        <div style="padding: 10px 0 20px 10px;">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Hover Data Table</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Extn.</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
                </thead>

                <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Extn.</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<!-- 2.行为 :处理逻辑-->
<script>

  export default {
    name: 'MainContent',
    data() {
      return {
        msg: 'Welcome to my Vue App!'
      }
    }
  }


  $(function () {
    $('#example2').DataTable(
      {
        "ajax": './objects.txt',
        buttons: [
          { extend:'copy', attr: { id: 'allan' } }, 'csv', 'excel', 'pdf', 'print',  'colvis',
          {
            text: 'My button',
            action: function ( e, dt, node, config ) {
              alert( 'Button activated' );
            }
          },  {
            text: 'Button 2',
            action: function ( e, dt, node, conf ) {
              alert( 'Button 2 clicked on' );
            }
          }
        ],

        "columns": [
          { "data": "name" },
          { "data": "position" },
          { "data": "office" },
          { "data": "extn" },
          { "data": "start_date" },
          { "data": "salary" }
        ],
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        'scrollY': 200,
        'scrollX': true,
        "pagingType": "full_numbers",
        "dom":"<'row'B<'col-sm-6'f>> <'row'<'col-sm-12'tr>><'row'<'col-sm-3'l> <'col-sm-3'i> <'col-sm-6'p>>",
        "language": {
          "emptyTable": "暂无数据",
          "processing": "处理中...",
          "loadingRecords": "加载中...",
          "zeroRecords": "未查询到符合条件的数据",
          "lengthMenu": "每页显示 _MENU_ 条记录",
          "search": "搜索:",
          "paginate": {
            "first": "首页",
            "last": "末页",
            "next": "下一页",
            "previous": "上一页"
          },
          "info": "显示 _START_ 到 _END_ 条记录， 共 _TOTAL_ 条记录",
          "infoEmpty": "Showing 0 to 0 of 0 entries",
        }
      }
    );
  })
</script>

<!-- 3.样式:解决样式     -->
<style>

</style>
