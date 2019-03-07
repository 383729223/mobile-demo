<template>
  <div class="header">
    <div class="headerLeft">
      <router-link to="/home">
        <img src="../../../static/icon/logo1.png" alt>
      </router-link>
    </div>
    <div class="headerMd">
      <input type="text" placeholder="搜索商品">
    </div>
    <div class="headerRight">
      <router-link to="/news">
        <img src="../../../static/icon/home_H_topright.png" alt>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

.header {
  @include rect(100%, 0.5rem);
  @include background-color(#fff);
  @include flexbox();
  @include justify-content();
  @include align-items();
  .headerLeft {
    img {
      @include rect(auto, 0.3rem);
    }
  }
  .headerMd {
    @include margin-left(7%);
    @include margin-right(7%);
    @include text-align();
    input {
      @include rect(100%, 0.3rem);
      @include text-align();
      @include border-radius(0.1rem);
      @include background-color(#ccc);
      @include line-height();
      outline: none;
      border: none;
    }
  }
  .headerRight {
    img {
      @include rect(auto, 0.3rem);
    }
  }
}
</style>
