<template>
    <div class="container">
      <Nobackheader/>
      <div class="content">
        <div class="userhead">
          <div class="headimg" @click="updatahead"><img src="../../static/icon/userhead.jpg" alt=""></div>
          <p>xingadmin</p>
          <span>(点击头像即可更换)</span>
        </div>
        <mt-cell title="购物记录" to="/" is-link value="查看全部订单" class="navtitle"></mt-cell>
        <ul class="usernav">
          <router-link tag="li" to="/">
            <img src="../../static/icon/fukuan.png" alt="">
            <span>代付款</span>
          </router-link>
          <router-link tag="li" to="/">
            <img src="../../static/icon/fahuo.png" alt="">
            <span>代发货</span>
          </router-link>
          <router-link tag="li" to="/">
            <img src="../../static/icon/shouhuo.png" alt="">
            <span>代收货</span>
          </router-link>
          <router-link tag="li" to="/">
            <img src="../../static/icon/pingjia.png" alt="">
            <span>已完成</span>
          </router-link>
          <router-link tag="li" to="/">
            <img src="../../static/icon/tuikuan.png" alt="">
            <span>退款/售后</span>
          </router-link>
        </ul>
        <mt-button type="danger" size="large" @click.native="outLogin">注销登录</mt-button>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
    </div>
</template>

<script>
import Nobackheader from '@/components/common/Nobackheader'
import Vue from "vue";
import { Button,Field,Toast, Cell, Actionsheet } from "mint-ui";
import axios from 'axios'

Vue.use(Button, Field, Cell, Actionsheet);

export default {
    name: 'user',
    components:{Nobackheader},
    data(){
      return{
        sheetVisible:'',
        actions:[
          {
            name:'拍照',
            methods:this.takePic
          },
          {
            name:'从手机相册选取',
            methods:this.selectPic
          }
        ],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false
      }
    },
    methods:{
      updatahead(){
        this.sheetVisible=true
      },
      takePic(){
        console.log("打开照相机")
      },
      selectPic(){
        console.log("打开相册")
      },
      outLogin(){
        this.$store.commit('changeLoginState',false)
        Toast({
          message: '注 销 成 功',
          iconClass: 'iconfont icon-popsuccess'
        })
        this.$router.push('/')
      }
    },
    // 路由的组件守卫
    // 进入该组件前守卫
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        if (vm.$store.state.loginRegisterStore.loginState) {
          next()
        } else {
          next('/register')
        }
      })
    },
    // 离开该组件时守卫
    beforeRouteLeave(to, from, next) {
      next()
    }
}
</script>

<style lang='scss'>
@import "@/qunar/reset.scss";

.userhead{
  @include border-radius(0 0 55% 55%);
  @include rect(100%,1.37rem);
  @include background-color(#ff9e01);
  @include flexbox();
  @include flex-direction(column);
  @include align-items();
  @include justify-content();

  div.headimg{
    @include rect(0.72rem,0.72rem);
    @include border-radius(50%);
    @include overflow(hidden);

    img{
      @include rect(100%,100%);
    }
  }
  p{
    @include text-color(#fff);
    @include font-weight();
  }
  span{
    @include text-color(#777);

  }
}

.navtitle{
  @include background-color(#fff);
}
ul.usernav{
  @include rect(100%,0.76rem);
  @include flexbox();
  @include align-items();
  @include justify-content(space-around);
  @include background-color(#fff);
  li{
    @include rect(0.77rem,auto);
    @include flexbox();
    @include flex-direction(column);
    @include align-items();
    @include justify-content();
    img{
      @include rect(0.24rem,auto);

    }
    span{

    }
  }
}
</style>
