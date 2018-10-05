<template>
  <body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="#/admin">ECMS 管理系统</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">管理员登录</p>

      <form action="#/admin" method="get" novalidate="novalidate" class="bv-form">

        <div class="form-group has-feedback">
          <input type="text" name="username" class="form-control" placeholder="请输入登录邮箱/登录名" data-bv-field="username">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <small data-bv-validator="notEmpty" data-bv-validator-for="username" class="help-block"
                 style="display: none;">登录邮箱名或用户名不能为空
          </small>
        </div>

        <div class="form-group has-feedback">
          <input type="password" name="password" class="form-control" placeholder="请输入密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>

        <div class="form-group">
          <div class="col-xs-4" style="padding:0px;">
            <input type="text" class="form-control" name="captcha" placeholder="请输入验证码" data-bv-field="captcha">
            <small data-bv-validator="notEmpty" data-bv-validator-for="captcha" class="help-block"
                   style="display: none;">验证码不能为空
            </small>
          </div>
          <div class="col-xs-5" style="text-align:right;padding-right: 0px;">
            <img id="codeImg" src="/captcha" onclick="changeCaptcha()" class="img-responsive" style="height: 35px;">
          </div>
          <div class="col-xs-3" style="padding-top:10px;">
            <span><a href="#" onclick="changeCaptcha()">换一换</a></span>
          </div>
        </div>

        <div class="row" style="margin-top:70px;">
          <div class="col-xs-6">
            <div class="checkbox icheck">
              <label>
                <div class="icheckbox_square-red" aria-checked="false" aria-disabled="false">
                  <input type="checkbox" name="rememberMe" style="margin: 0 auto;position: relative">&nbsp;&nbsp;记住用户
                  <ins class="iCheck-helper"></ins>
                </div>

              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-6">
            <div class="checkbox pull-right">
              <a href="#">忘记密码</a>
              <span>&nbsp;/&nbsp;</span>
              <a href="#/register" class="text-center">注册</a>
            </div>
          </div>
          <!-- /.col -->
        </div>

        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-danger btn-block btn-flat" @click="handleLogin('loginForm')">登 录</button>
          </div>
        </div>

        <input type="hidden" value="">
      </form>

      <div class="social-auth-links" style="margin-bottom: 0px;">
        <div class="row">
          <div class="col-xs-5">
            <div class="text-left" style="margin-top: 5px;">快速登录</div>
          </div>
          <div class="col-xs-7">
            <div class="text-right">
              <!--<a class="btn btn-social-icon btn-primary"><i class="fa fa-qq"></i></a>
              <a class="btn btn-social-icon btn-success"><i class="fa fa-wechat"></i></a>
              <a class="btn btn-social-icon btn-warning"><i class="fa fa-weibo"></i></a>
              <a class="btn btn-social-icon btn-info"><i class="fa fa-github"></i></a>-->
              <a class="btn btn-social-icon btn-info"
                 href="https://github.com/login/oauth/authorize?client_id=665051f90d4b055f5ab6&amp;redirect_uri=http%3A%2F%2Fwww.admineap.com%2Foauth%2Fgithub%2Fcallback&amp;state=8da338efdb8c11e6a8f82c11d0e2fa3f"><i
                class="fa fa-github"></i></a>
            </div>
          </div>
        </div>
        <!-- /.social-auth-links -->
      </div>
    </div>
    <!-- /.login-box-body -->
    <div class="text-center" style="margin-top:10px;font-size:16px;">
      忘记密码，试试
      <a href="/ai/face/login" style="font-weight: bold;font-size:18px;">刷脸登录</a>
    </div>
  </div>
  <!-- /.login-box -->
  </body>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        msg: 'Welcome to Login'
      }
    },
    methods: {
      handleLogin: function (message) {
        console.log("登录信息："+message);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
