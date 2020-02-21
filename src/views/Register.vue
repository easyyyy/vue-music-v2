<template>
    <div>
      <div class="row">
        <div class="col-md-4 col-md-offset-4">

          <!-- Start Sign In Form -->
          <form action="#" class="fh5co-form animate-box" data-animate-effect="fadeIn">
            <h2>注册</h2>
            <div class="form-group">
              <label for="username" class="sr-only">用户名</label>
              <input type="text" v-model="userName" class="form-control" id="username" placeholder="用户名" autocomplete="off">
            </div>
            <div class="form-group">
              <label for="username" class="sr-only">Email</label>
              <input type="text" v-model="userEmail" class="form-control" id="email" placeholder="Email" autocomplete="off">
            </div>
            <div class="form-group">
              <label for="password" class="sr-only">密码</label>
              <input type="password" v-model="userPassword" class="form-control" id="password" placeholder="密码" autocomplete="off">
            </div>
            <div class="form-group">
              <label for="userEmailCode" class="sr-only">Email</label>
              <input type="text" v-model="userEmailCode" class="form-control" id="userEmailCode" placeholder="Email验证码" autocomplete="off">
              <input type="submit" value="发送验证码" class="btn btn-primary" @click="clickSendEmail">
            </div>
            <div class="form-group">
              <input type="submit" value="注册" class="btn btn-primary" @click="clickRegister">
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      userEmail: '',
      userPassword: '',
      userEmailCode: ''
    }
  },
  methods: {
    clickRegister () {
      this.$axios.post(this.$localMusicApi + '/user/register', {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        emailCode: this.userEmailCode
      }).then(this.registerResponse)
    },
    registerResponse (res) {
      if (res.data.msg === '注册成功') {
        this.$toast('注册成功')
        this.$router.push({
          name: 'user'
        })
      } else {
        this.$toast('该邮箱已注册')
      }
    },
    clickSendEmail () {
      this.$axios.get(this.$localMusicApi + '/register/email/code?email=' + this.userEmail).then(this.clickSendEmailSucc)
    },
    clickSendEmailSucc (res) {
      if (res.data.msg === '验证码发送失败') {
        this.$toast('验证码发送失败')
      } else if (res.data.msg === '该邮箱已注册') {
        this.$toast('该邮箱已注册')
      } else {
        this.$toast('验证码发送成功,验证码有效期5分钟！')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .fh5co-form h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 20px;
    margin: 0 0 30px 0;
    color: #000000;
  }
  .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .fh5co-form {
    padding: 30px;
    margin-top: 4em;
    -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .fh5co-form .form-group {
    margin-bottom: 30px;
  }
  .fh5co-form label {
    font-weight: 300;
    font-size: 14px;
    font-weight: 300;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .fh5co-form .form-control {
    font-size: 16px;
    font-weight: 300;
    height: 50px;
    padding-left: 0;
    padding-right: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -o-box-shadow: none;
    box-shadow: none;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    -ms-border-radius: 0px;
    border-radius: 0px;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  button, html input[type=button], input[type=reset], input[type=submit] {
    -webkit-appearance: button;
    cursor: pointer;
  }
  .btn-primary {
    height: 50px;
    padding-right: 20px;
    padding-left: 20px;
    border: none;
    background: #33cccc;
    color: #ffffff;
    -webkit-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    -moz-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    -o-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
  }
</style>
