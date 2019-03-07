<template>
    <div class="container">
      <Nobackheader/>
      <mt-cell title="筛选条件" class="filterTitle">
        <img slot="icon" src="../../static/icon/login.png" width="24" height="24">
        <mt-button plain size="small" class="priceUp" @click.native="priceUp">价格升序</mt-button>
        <mt-button plain size="small" @click.native="priceDown">价格降序</mt-button>
      </mt-cell>
      <div class="content">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <product-lists :lists="lists"></product-lists>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Nobackheader from '@/components/common/Nobackheader'
import ProductLists from '@/components/home/Productlists'
import api from '@/api/kind'
import {mapState,mapActions,mapGetters} from 'vuex'
import { Button, Toast, Cell, Loadmore } from "mint-ui";
import axios from 'axios'

Vue.use(Button, Cell, Loadmore);


export default {
    name: 'kind',
    components:{Nobackheader,ProductLists},
    data(){
      return{
        allLoaded:false,
        pagecode:1,
      }
    },
    created(){
      // this.requestListData()
      
      // 判断当前列表是否有值，若没有则请求
      // if(this.$store.state.kindStore.lists.length === 0){
      //   this.requestListData()
      // }
    },
    methods:{
      ...mapActions(['requestSortUpData','requestSortDownData','requestListData','loadMoreData']),
      priceUp(){
        this.requestSortUpData().then(data=>{
          this.$store.commit('changeProList',data)
        })
      },
      priceDown(){
        this.requestSortDownData().then(data=>{
          this.$store.commit('changeProList',data)
        })
      },
      // 下拉刷新
      loadTop() {
        this.loadMoreData(this.pagecode).then(data=>{
          // console.log(data)
          this.$store.commit('changeProList',data[0])
          this.pagecode=1;
          this.$refs.loadmore.onTopLoaded();
          Toast({
            message: '已经是第一页！',
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
      }
    },
    computed:{
      ...mapState({
        lists:state=>state.kindStore.lists
      })

    }
}
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

.filterTitle{
  .priceUp{
    @include margin-right(0.1rem);
  }
}

.content{

}

</style>
