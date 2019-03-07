<template>
    <div class="container">
      <Nobackheader/>
      <div class="content">

      <mt-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" ref="loadmore">

        <ul class="newsList">
          <li v-for="(item,index) of newList" :key="index" >
            <a :href="item.url">
              <div class="newsTop">
                <div class="newsTitle">{{item.title}}</div>
                <div class="newsDate">
                  <p>来源：{{item.author_name}}</p>
                  <p>{{item.date}}</p>
                </div>
              </div>
              <div class="newsBottom">
                <img :src="item.thumbnail_pic_s" alt="">
                <img :src="item.thumbnail_pic_s02" alt="">
                <img :src="item.thumbnail_pic_s03" alt="">
              </div>
            </a>
          </li>
        </ul>

      </mt-loadmore>


      </div>
    </div>
</template>

<script>

import Vue from 'vue'
import Nobackheader from '@/components/common/Nobackheader'
import axios from 'axios'
import vueResource from 'vue-resource'
import { Loadmore,Toast  } from "mint-ui";


Vue.use(vueResource, Loadmore)

export default {
    name: 'news',
    components:{Nobackheader},
    data(){
      return{
        newlists:[],
        allLoaded:false
      }
    },
    computed:{
      newList(){
        return this.newlists
      }
    },
    created(){
      // AppKey：ea7ed1f370c10486a1f2a6fd449c6a0e
      this.$http.get('/api/toutiao/index?type=shehui&key=ea7ed1f370c10486a1f2a6fd449c6a0e').then(data=>{
        console.log(data)
        this.newlists=data.body.result.data
      })
    },
    methods:{
      loadTop() {
        let arr=['top','shehui','guonei','guoji','yule','tiyu','junshi','keji','caijing','shishang']
        
        this.$http.get('/api/toutiao/index?type=top&key=ea7ed1f370c10486a1f2a6fd449c6a0e').then(data=>{
          console.log(data.body.result.data)
          this.newlists=data.body.result.data
          this.$refs.loadmore.onTopLoaded();
          Toast({
            message: '已经更新！',
            iconClass: 'iconfont icon-chuanshuwancheng',
          });
        })
      }
    }
}
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

.container{

  .content{

    ul.newsList{
      @include rect(100%,auto);
      @include flexbox();
      @include flex-direction(column);
    
      li{
        @include background-color(#fff);
        @include rect(100%,auto);
        @include flexbox();
        @include flex-direction(column);
        @include margin(0.04rem 0 0.04rem 0);
        a{
          @include text-color(#666);
          .newsTop{
            @include rect(100%,0.5rem);
            @include flexbox();
            @include justify-content(space-between);
            @include align-items();
            @include padding(0 0.1rem 0 0.1rem);
            .newsTitle{
              @include rect(60%,100%);
              @include ellipsis(60%,2);
              @include line-height(0.25rem);
              @include font-weight();
              @include text-color(#333);
            }
            .newsDate{
              @include flex();
              @include rect(auto,100%);
              @include flexbox();
              @include flex-direction(column);
              @include justify-content();
              @include align-items(flex-end);
              p{
                @include ellipsis(100%,1);
                @include text-align(right);
              }
            }
          }
          .newsBottom{
            @include flex();
            @include rect(100%,auto);
            @include flexbox();
            @include justify-content();
            @include align-items();
            img{
              @include rect(30%,auto);
              @include margin(0 0.02rem 0.08rem 0.02rem);

            }
          }
        }
      }
    }
  }

}

</style>
