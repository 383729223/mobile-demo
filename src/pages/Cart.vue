<template>
  <div class="container">
    <Backheader/>
    <mt-header title="购物车" class="cartHeader">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content">
      <ul class="listBox">
        <li v-for="item of prolists" :key="item[0]._id">
          <!-- <mt-checklist v-model="value" :options="options" class="selBtn"></mt-checklist> -->
          <div class="selBtn">
            <input type="checkbox"  v-model="item[0].flag">
          </div>
          <div class="productPhoto">
            <img :src="item[0].big_pic" alt="">
          </div>
          <div class="productRight">
            <div class="productRightTop">{{ item[0].title }}</div>
            <div class="productRightBottom">
              <div class="productPrice">¥{{ item[0].discount_price }}</div>
              <div class="countBox">
                <mt-button plain size="small" @click.native="downCount(item[0]._id)">-</mt-button>
                <input placeholder="请输入数量" type="number" :value="totalNum"/>
                <mt-button plain size="small" @click.native="addCount(item[0]._id)">+</mt-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cartFooter">
      <div class="listsSum">
        <span>合计：</span>¥{{totalPrice}}
      </div>
      <div class="btnSum">结算</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Backheader from '@/components/common/Backheader'
import { Toast, Checklist, Cell, Header, Button, Field   } from "mint-ui";
import { mapActions,mapState,mapGetters } from 'vuex'

Vue.use(Checklist, Cell, Header, Button, Field );

export default {
  name: "cart",
  components:{Backheader},
  data(){
    return{
      number:1,
      proListDetail:[],
      // sumprice:0
    }
  },
  methods:{
    ...mapActions(['requestCartData','requestStorageData','requestGetCartData']),
    addCount(id){
      
      // let newArr=[]
      // this.number++
      // JSON.parse(sessionStorage.getItem('cartListId')).forEach((item,index)=>{
      //   this.requestCartData(item).then(data=>{
      //     if(data[0]._id === id){
      //       data[0].buyCount=this.number
      //     }
      //     console.log(data)
      //   })
      // })
    },
    downCount(id){
      if(this.number<1){
        this.number=1
      }else{
        this.number--
      }
      
    }
  },
  computed:{
    ...mapGetters(['totalPrice', 'totalNum']),
    prolists(){
      return this.proListDetail
    },
    proCount(){
      
    },
   
  },
  created(){
    let proListId=[]
    if (this.$store.state.loginRegisterStore.loginState) {
        if(sessionStorage.getItem('cartListId')){
          proListId=JSON.parse(sessionStorage.getItem('cartListId'))
          proListId.forEach((item,index)=>{
            this.requestCartData(item).then(data=>{
              // console.log(data)
              // this.$store.commit('changeDeatailMsg',data)
              this.proListDetail.push(data)
              // this.sumprice+=data[0].discount_price
            })
          })
          this.$store.commit('changeCartList',this.proListDetail)
        }else{
          Toast({
            message: '购物车空空如也',
            iconClass: 'iconfont icon-ziyuan',
          });
        }
    }

    // this.requestGetCartData().then(data=>{
    //   console.log(data)
    // })

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
};
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

.cartHeader{
  @include background-color(#FF9E01);
  @include font-size(0.18rem);
}

ul.listBox{
  @include rect(100%,auto);
  @include flexbox();
  @include flex-direction(column);
  @include align-items();

  li{
    @include rect(100%,1rem);
    @include background-color(#fff);
    @include flexbox();
    @include align-items();
    // @include justify-content(space-between);
    .selBtn{
      @include rect(0.5rem,100%);
      @include flexbox();
      // @include flex-direction(column);
      @include align-items();
      @include justify-content();
      input{
        // @include border-radius(50% 50%);
        @include rect(0.2rem,0.2rem);
        @include border(1px,#666,solid);
        
      }
    }
    .productPhoto{
      @include rect(auto,100%);
      @include text-align();
      border-left: 1px solid #666;
      border-right: 1px solid #666;

      img{
        @include rect(auto,100%);
      }
    }
    .productRight{
      @include flex();
      @include rect(20%,100%);
      @include flexbox();
      @include flex-direction(column);
      .productRightTop{
        @include rect(100%,0.5rem);
        @include line-height(0.25rem);
        @include ellipsis(100%,2);
        @include padding(0 0.2rem 0 0.2rem);
      }
      .productRightBottom{
        @include flex();
        @include rect(100%,auto);
        @include flexbox();
        .productPrice{
          @include flex(1);
          @include line-height(0.5rem);
          @include text-align();
          @include text-color(#E4393C);
          @include font-weight();
        }
        .countBox{
          @include flex(3);
          // @include background-color(#ccc);
          @include flexbox();
          @include align-items();
          @include justify-content();
          input{
            @include rect(40%,0.33rem);
            @include line-height(0.33rem);
            @include text-align();
            @include border(none);
            outline: 0;
          }
        }
      }
    }
  }
}


.cartFooter{
  @include rect(100%,0.5rem);
  @include background-color(#fff);
  @include flexbox();
  @include justify-content(flex-end);
  @include align-items();

  .listsSum{
    @include rect(auto,100%);
    @include text-color(#E4393C);
    @include line-height(0.5rem);
    @include font-size(0.2rem);
    span{
      @include text-color(#333);
      @include font-size(0.16rem);

    }
  }
  .btnSum{
    @include margin-left(0.1rem);
    @include rect(40%,100%);
    @include text-color(#fff);
    @include text-align();
    @include line-height(0.5rem);
    @include font-size(0.18rem);
    @include background-color(#E4393C);
  }
  
}
</style>
