<template>
  <div class="container">
    <Backheader/>
    <div class="content">
      <mt-swipe :auto="2000"  class="my-swipe-detail">
        <mt-swipe-item><img :src="deatilInfo.big_pic"></mt-swipe-item>
      </mt-swipe>
      <div class="productInfo">
        <h3>{{deatilInfo.title}}</h3>
        <p>产地：{{deatilInfo.prov_city}}</p>
        <p class="oriprice">原价：¥{{deatilInfo.original_price}}</p>
        <p class="redBlod">折扣价：¥{{deatilInfo.discount_price}}</p>
        <p>数量：{{deatilInfo.count}}</p>

      </div>

    </div>

    <div class="detailFooter">
      <div class="detailCart">
        <img src="../../static/icon/客服.png" alt="">
        <p>客服</p>
      </div>
      <div class="detailCart">
        <img src="../../static/icon/购物车.png" alt="">
        <p>购物车</p>
      </div>
      <div class="addCart btncommon" @click="addCart">加入购物车</div>
      <div class="fastBuy btncommon">立即购买</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Backheader from "@/components/common/Backheader";
import api from "@/api/detail/index";
import { Swipe, SwipeItem, Button, Toast, Cell } from "mint-ui";
import { mapActions,mapState,mapGetters } from 'vuex'

Vue.use(Swipe, SwipeItem, Button, Cell);

export default {
  name: "detail",
  components: {
    Backheader
  },
  data() {
    return {
      deatilInfo: {},
      msgid:0
    };
  },
  created() {
    // 根据列表带过来的id，通过api进行兜库查询该数据的详细信息
    api.requestData(this.$route.query.id)
      .then(data => {
        // console.log(data.data.data[0])
        this.deatilInfo = data.data.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    ...mapActions(['requestCartData','requestStorageData']),

    addCart(){
      // 存session
      let idData=[]
      let produId=parseInt(this.$route.query.id)

      if (this.$store.state.loginRegisterStore.loginState) {
        if(sessionStorage.getItem('cartListId')){
          idData=JSON.parse(sessionStorage.getItem('cartListId'))
          
          if(idData.indexOf(produId)==-1){
            idData.push(produId)
            sessionStorage.setItem('cartListId',JSON.stringify(idData))
            Toast({
              message: '加入购物车！',
              iconClass: 'iconfont icon-gouwuche',
            });

            // 同时存进数据库
            this.requestCartData(this.$route.query.id).then(data=>{
              console.log(data[0])
              let parms={
                _id:data[0]._id,
                big_pic:data[0].big_pic,
                title:data[0].title,
                prov_city:data[0].prov_city,
                discount_price:data[0].discount_price,
                original_price:data[0].original_price,
                count:data[0].count,
                buyCount:data[0].buyCount,
                flag:data[0].flag
              }
              this.requestStorageData('http://39.98.41.185/api/cart/addAction',parms)
            })

          }else{
            Toast({
              message: '购物车已存在！',
              iconClass: 'iconfont icon-Warning',
            });
          }

        }else{
          idData=[produId]
          sessionStorage.setItem('cartListId',JSON.stringify(idData))
          Toast({
            message: '加入购物车！',
            iconClass: 'iconfont icon-gouwuche',
          });
          // 同时存进数据库
          this.requestCartData(this.$route.query.id).then(data=>{
            console.log(data[0])
            let parms={
              _id:data[0]._id,
              big_pic:data[0].big_pic,
              title:data[0].title,
              prov_city:data[0].prov_city,
              discount_price:data[0].discount_price,
              original_price:data[0].original_price,
              count:data[0].count,
              buyCount:data[0].buyCount,
              flag:data[0].flag
            }
            this.requestStorageData('http://39.98.41.185/api/cart/addAction',parms)
          })
        }
      }else{
        this.$router.push({path: '/register'})
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/qunar/reset.scss";

.content{
  .my-swipe-detail{
    @include rect(100%, 65%);
    @include text-align();
    img {
      @include rect(100%, auto);
    }
  }
  .productInfo{
    @include background-color(#fff);
    @include padding(0.05rem);
    h3{
      @include font-size(0.18rem);
    }
    p{
      @include font-size(0.15rem);
    }
    .oriprice{
      @include text-color(#666);
      @include font-weight(); 
      text-decoration:line-through;
    }
    .redBlod{
      @include font-weight(); 
      @include text-color(#f00);
    }
  }
}

.detailFooter{
  @include rect(100%,0.5rem);
  @include flexbox();
  @include justify-content(space-between);
  @include align-items();

  div.detailCart{
    @include rect(0.45rem,0.5rem);
    @include flexbox();
    @include flex-direction(column);
    @include align-items();
    @include justify-content();
    @include background-color(#fff);
    img{
      @include rect(0.2rem,0.2rem);
    }
    p{
      @include text-align();
    }
  }
  .btncommon{
    @include rect(auto,100%);
    @include text-color(#fff);
    @include text-align();
    // @include font-weight();
    @include line-height(0.5rem);
    @include font-size(0.18rem);
    @include flex();
  }
  .addCart{
    @include background-color(#FF9600);
  }
  .fastBuy{
    @include background-color(#E4393C);
  }
}
</style>

