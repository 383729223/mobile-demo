<template>
  <ul class="productList">
    <li v-for="(item,index) of lists" :key="index" @click="toDetail(item._id)">
      <img :src="item.big_pic" :alt="item.big_pic">
      <p>{{item.title}}</p>
      <p>{{item.prov_city}}</p>
      <p><span class="orpic">¥{{item.original_price}}</span>&nbsp;&nbsp;<span class="salepic">¥{{item.discount_price}}</span></p>
    </li>
  </ul>
</template>

<script>
export default {
  name:'productList',
  props:{
    lists:{
      type:Array,
      required:true
    }
  },
  
  methods:{
    toDetail(id){
      this.$router.push({path:'/detail',query:{id}})
    }
  }

};
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

ul.productList {
  @include flexbox();
  @include rect(100%, auto);
  @include flex-wrap(wrap);
  li {
    @include margin(1%);
    @include background-color(#fff);
    @include rect(48%, auto);
    @include flexbox();
    @include flex-direction(column);
    @include justify-content(space-between);
    @include align-items();
    img {
      @include rect(100%, auto);
    }
    p{
      @include ellipsis(100%,1);
      @include text-align();
      span.orpic{
        @include text-color(#666);
        text-decoration:line-through;
      }
      span.salepic{
        @include text-color(#f00);
        @include font-weight();
      }
    }
  }
}
</style>
