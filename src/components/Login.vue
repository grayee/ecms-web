<template>
  <body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="/admin">JSCS 管理系统</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg" v-if="msg">{{msg}}</p>
      <form ref="form" :model="loginForm" novalidate="novalidate" class="bv-form">
        <div class="form-group has-feedback">
          <input type="text" v-model="loginForm.username" name="username" v-validate="'required'"
                 class="form-control" @keyup.enter="handleLogin"  placeholder="请输入登录邮箱/登录名" data-bv-field="username">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <!--
          errors.first('field') -- 获取关于当前field的第一个错误信息
          collect('field') -- 获取关于当前field的所有错误信息(list)
          has('field') -- 当前filed是否有错误(true/false)
          -->
          <div v-show="veeErrors.has('username')" class="error">{{ veeErrors.first('username') }}</div>
        </div>

        <div class="form-group has-feedback">
          <input type="password" v-model="loginForm.password" name="password" v-validate="'required'"
                 class="form-control" @keyup.enter="handleLogin" placeholder="请输入密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <div v-show="veeErrors.has('password')" class="error">{{ veeErrors.first('password') }}</div>
        </div>

        <div class="form-group">
          <div class="col-xs-4" style="padding:0px;">
            <input type="text" class="form-control" name="captcha" placeholder="请输入验证码" data-bv-field="captcha">
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
              <a href="/register" class="text-center">注册</a>
            </div>
          </div>
          <!-- /.col -->
        </div>

        <div class="row">
          <div class="col-xs-12">
            <button type="button" class="btn btn-danger btn-block btn-flat" @click="handleLogin">登 录</button>
          </div>
        </div>

      </form>

      <div class="social-auth-links" style="margin-bottom: 0px;">
        <div class="row">
          <div class="col-xs-5">
            <div class="text-left" style="margin-top: 5px;">快速登录</div>
          </div>
          <div class="col-xs-7">
            <div class="text-right">
              <a class="btn btn-social-icon btn-primary"><i class="fa fa-qq"></i></a>
              <a class="btn btn-social-icon btn-success"><i class="fa fa-wechat"></i></a>
              <a class="btn btn-social-icon btn-warning"><i class="fa fa-weibo"></i></a>
              <a class="btn btn-social-icon btn-info" href="/oauth/login/github"><i class="fa fa-github"></i></a>
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
        msg: 'Welcome to Login',
        loginForm: {
          username: '',
          password: '',
        }
      }
    },
    mounted: function () {
      console.log("login view load finished!");
    },
    methods: {
      handleLogin: function () {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
              // 除了登录路由、和系统消息路由，这个跟路由是一个欢迎路由，是静态路由
              this.$router.push({path: '/'});
            }).catch(error => {
              this.msg = error;
              setTimeout(() => {
                this.msg = "Welcome to Login";
              }, 3000);
              console.log("login failed with error:", error);
            });
          } else {
            console.log("validate login form field failed!");
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .checkbox {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
