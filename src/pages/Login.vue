<template>
  <div class="container">
    <Backheader/>
    <div class="content">
      <div class="loginbox">
        <div class="box">
            <mt-cell title="用户登录" class="loginTitle">
              <span class="note">欢迎登录优奇美商城</span>
              <img slot="icon" src="../../static/icon/login.png" width="24" height="24">
            </mt-cell>
            <mt-field placeholder="请输入手机号" type="tel" v-model="phone" :state="phoneState"></mt-field>
            <mt-field placeholder="请输入密码" type="password" v-model="password" :state="passwordState"></mt-field>
            <mt-button :type="type" size="large" :disabled='isAllOk' @click.native="login">登录</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Backheader from "@/components/common/Backheader";
import { Button,Field,Toast, Cell } from "mint-ui";
import axios from 'axios'
import {mapState,mapActions,mapGetters} from 'vuex'

Vue.use(Button, Field, Cell);

export default {
  name: "register",
  components: {
    Backheader
  },
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods:{
    login(){
      axios.post('https://www.daxunxun.com/users/login',{
        username:this.phone,
        password:this.password
      }).then(data=>{
        // console.log(data)
        if(data.data === -1){
          Toast({
            message: '密 码 错 误',
            iconClass: 'iconfont icon-Warning'
          });
        }else if(data.data === 2){
          Toast({
            message: '没有该用户',
            iconClass: 'iconfont icon-error'
          });
        }else if(data.data === 0){
          Toast({
            message: '登 录 失 败',
            iconClass: 'iconfont icon-error'
          });
        }else{
          Toast({
            message: '登 陆 成 功',
            iconClass: 'iconfont icon-popsuccess'
          });
          this.$store.commit('changeLoginState',true)
          this.$router.push('/user')
        }
      }).catch(err=>console.log(err))
    }
    // login(){
    //   this.requestLoginStateData(this.phone,this.password).then(data=>{
    //     console.log(data.data)
    //     if(data.data === -1){
    //       Toast({
    //         message: '密码错误',
    //         position: 'middle',
    //         duration: 3000
    //       });
    //     }else if(data.data === 2){
    //       Toast({
    //         message: '没有该用户',
    //         position: 'middle',
    //         duration: 3000
    //       });
    //     }else if(data.data === 0){
    //       Toast({
    //         message: '登录失败',
    //         position: 'middle',
    //         duration: 3000
    //       });
    //     }else{
    //       Toast({
    //         message: '登陆成功',
    //         position: 'middle',
    //         duration: 3000
    //       });
    //       localStorage.setItem('isLogin','ok')
    //       this.$router.push('/user')
    //     }
    //   }).catch(err=>console.log(err))
    // },
    // ...mapActions(['requestLoginStateData'])

  },
  computed:{
    phoneState(){
      if(this.phone === ''){
        return ''
      }else{
        if(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.phone)){
          return 'success'
        }else{
          return 'error'
        }
      }
    },
    passwordState(){
      if(this.password === ''){
        return ''
      }else{
        if(this.password.length >= 6){
          return 'success'
        }else{
          return 'error'
        }
      }
    },
    type(){
      if(this.phoneState==='success' && this.passwordState==='success' ){
        return 'primary'
      }else{
        return 'default'
      }
    },
    isAllOk(){
      if(this.phoneState==='success' && this.passwordState==='success' ){
        return false
      }else{
        return true
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/qunar/reset.scss";

.loginbox {
  @include rect(100%, 100%);
  // @include background-color(#ff9e01);
  div.box {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    @include margin(auto);
    @include rect(90%, 40%);
    .loginTitle{
      @include background-color(#ff9e01);
      span.note{
        @include color(#fff);
      }
    }
  }
}
</style>
