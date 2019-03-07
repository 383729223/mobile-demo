<template>
  <div class="container">
    <Backheader/>
    <div class="content">
      <div class="registerbox">
        <div class="box">
          <mt-cell title="用户注册" class="loginTitle">
            <span class="note">欢迎注册商城会员</span>
            <img slot="icon" src="../../static/icon/register.png" width="24" height="24">
          </mt-cell>
          <mt-field placeholder="请输入用户名" v-model="username" :state="usernameState"></mt-field>
          <mt-field placeholder="请输入手机号" type="tel" v-model="phone" :state="phoneState"></mt-field>
          <mt-field placeholder="请输入验证码" type="tel" :state="codeState" v-model="code">
            <mt-button plain @click.native="sendCode" :disabled="isSend">{{ sendMsg }}</mt-button>
          </mt-field>
          <mt-field placeholder="请输入密码" type="password" v-model="password" :state="passwordState"></mt-field>
          <mt-button :type="type" size="large" :disabled="isAllOk" @click.native="sendRegister">会员注册</mt-button>


          <mt-cell title="若已经注册，请直接登录" class="loginTitle loginTab">
            <span class="note">欢迎登录</span>
            <img slot="icon" src="../../static/icon/login.png" width="24" height="24">
          </mt-cell>
          <mt-button type="primary" size="large" @click.native="login">会员登录</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Backheader from "@/components/common/Backheader";
import { Field, Button, Cell, Toast } from "mint-ui";
import axios from "axios";

Vue.use(Field, Button, Cell);

export default {
  name: "register",
  components: {
    Backheader
  },
  data() {
    return {
      username: "",
      phone: "",
      password: "",
      code: "",
      adminCode: "111",
      sendMsg: "发送验证码",
      isSend: false
    };
  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    sendCode() {
      if (this.phoneState === "success") {
        let time = 60;
        let timer = setInterval(() => {
          this.sendMsg = time + "s后可重新发送";
          this.isSend = true;
          time -= 1;
          if (time < 0) {
            clearInterval(timer);
            this.sendMsg = "发送验证码";
            this.isSend = false;
          }
        }, 1000);

        axios
          .get("https://www.daxunxun.com/users/sendCode?tel=" + this.phone)
          .then(data => {
            console.log(data);
            if (data.data === 1) {
              Toast({
                message: "该用户已注册",
                iconClass: 'iconfont icon-Warning'
              });
            } else if (data.data === 0) {
              Toast({
                message: "手机号验证码获取失败",
                iconClass: 'iconfont icon-error'
              });
            } else {
              this.adminCode = data.data.code;
            }
          })
          .catch(err => console.log(err));
      } else {
        Toast({
          message: "请先输入正确的手机号码",
          position: "middle",
          duration: 3000
        });
      }
    },
    sendRegister() {
      axios
        .post("https://www.daxunxun.com/users/register", {
          username: this.phone,
          password: this.password
        })
        .then(data => {
          if (data.data === 2) {
            Toast({
              message: "该用户已注册",
              iconClass: 'iconfont icon-Warning'
            });
          } else if (data.data === 0) {
            Toast({
              message: "注 册 失 败",
              iconClass: 'iconfont icon-error'
            });
          } else {
            Toast({
              message: "注 册 成 功！",
              iconClass: 'iconfont icon-popsuccess'
            });
            this.$store.commit('changeLoginState',true)
            this.$router.push("/"); //注册成功后跳转首页
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    usernameState() {
      if (this.username == "") {
        return "";
      } else {
        if (/^[^ ]+$/.test(this.username)) {
          return "success";
        } else {
          return "error";
        }
      }
    },
    phoneState() {
      if (this.phone === "") {
        return "";
      } else {
        if (/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.phone)) {
          return "success";
        } else {
          return "error";
        }
      }
    },
    codeState() {
      if (this.code === "") {
        return "";
      } else {
        if (this.code === this.adminCode) {
          return "success";
        } else {
          return "error";
        }
      }
    },
    passwordState() {
      if (this.password === "") {
        return "";
      } else {
        if (this.password.length >= 6) {
          return "success";
        } else {
          return "error";
        }
      }
    },
    type() {
      if (
        this.usernameState === "success" &&
        this.phoneState === "success" &&
        this.passwordState === "success"
      ) {
        return "primary";
      } else {
        return "default";
      }
    },
    isAllOk() {
      if (
        this.usernameState === "success" &&
        this.phoneState === "success" &&
        this.passwordState === "success"
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/qunar/reset.scss";

.registerbox {
  @include rect(100%, 100%);
  // @include background-color(#ff9e01);
  div.box {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    @include margin(auto);
    @include rect(90%, 70%);
    .loginTitle{
      @include background-color(#ff9e01);
      span.note{
        @include color(#fff);
      }
    }
    .loginTab{
      @include margin(0.5rem 0 0 0);
    }
  }
}

</style>
