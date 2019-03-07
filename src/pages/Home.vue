<template>
  <div class="container">
    <homeheader></homeheader>

    <div class="content">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <mt-swipe :auto="2000"  class="my-swipe">
          <mt-swipe-item v-for="(item,index) of bannerdata" :key="index" class="my-swipe-item"><img :src="item"></mt-swipe-item>
        </mt-swipe>

        <homenav></homenav>

        <p class="listTitle">
          休
          <span>|</span>闲
          <span>|</span>零
          <span>|</span>食
        </p>

        <product-lists :lists="lists"></product-lists>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Homeheader from "@/components/home/Homeheader";
import Homenav from "@/components/home/Homenav";
import ProductLists from "@/components/home/Productlists";
import { Swipe, SwipeItem, Loadmore,Toast  } from "mint-ui";
import {mapState,mapActions,mapGetters} from 'vuex'

Vue.use(Swipe, SwipeItem, Loadmore)

export default {
  name: "home",
  components: {
    Homeheader,
    Homenav,
    ProductLists
  },
  data() {
    return {
      // lists: [],
      allLoaded:false,
      pagecode:1
    }
  },
  methods:{
    // 下拉刷新
    loadTop() {
      this.loadMoreData(this.pagecode).then(data=>{
        // console.log(data)
        this.$store.commit('changeProList',data[0])
        this.pagecode=1;
        this.$refs.loadmore.onTopLoaded();
        Toast({
          message: '已经更新！',
          iconClass: 'iconfont icon-chuanshuwancheng',
        });
      })
    },
    // 上拉加载
    loadBottom() {
      this.loadMoreData(this.pagecode).then(data=>{
        // console.log('新加载数据',data[0])
        // console.log(this.$store)
        if(data[0].length===0){
          this.allLoaded = true;// 若数据已全部获取完毕
          Toast({
            message: '数据加载完毕！',
            iconClass: 'iconfont icon-chuanshuwancheng',
          });
        }else{
         
          this.$store.commit('changemorelist', data[0])
          // console.log(this.$store.state.homeStore.lists)
          this.pagecode+=1
        }
        this.$refs.loadmore.onBottomLoaded();
      })
    },
    ...mapActions(['requestListData','loadMoreData'])
  },
  created() {
    // api.productList()
    //   .then(data => {
    //     this.lists = data;
    //   })
    //   .catch(err => console.log(err));
    // this.requestListData()
  },
  computed:{
    ...mapState({
      bannerdata:state=>state.homeStore.bannerdata,
      lists:state=>state.homeStore.lists
    })
  }
};
</script>

<style lang="scss">
@import "@/qunar/reset.scss";
.container{
  .content{
    .my-swipe {
      @include rect(100%, 1.9rem);
      .my-swipe-item{
        @include rect(100%, 1.9rem);
        img {
          @include rect(100%, auto);
        }
      }
    }
    p.listTitle {
      @include text-align();
      @include line-height(0.5rem);
      @include font-size(0.2rem);
      @include rect(100%, 0.5rem);
      @include flexbox();
      @include align-items();
      @include justify-content();
      span {
        @include font-size(0.1rem);
        @include margin-left(0.05rem);
        @include margin-right(0.05rem);
      }
    }

  }
}
</style>
