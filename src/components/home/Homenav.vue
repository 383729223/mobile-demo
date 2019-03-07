<template>
  <ul class="nav">
    <router-link to="/navdetail" tag="li">
      <img src="../../../static/icon/nav1.png" alt>
      <p>休闲零食</p>
    </router-link>
    <router-link to="/home" tag="li">
      <img src="../../../static/icon/nav2.png" alt>
      <p>生活优品</p>
    </router-link>
    <router-link to="/home" tag="li">
      <img src="../../../static/icon/nav3.png" alt>
      <p>精美特产</p>
    </router-link>
    <router-link to="/home" tag="li">
      <img src="../../../static/icon/nav4.png" alt>
      <p>商务礼品</p>
    </router-link>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/qunar/reset.scss";

.nav {
  @include rect(100%, 1.15rem);
  @include background-color(#fff);
  @include flexbox();
  @include justify-content(space-around);
  @include align-items();
  li {
    @include flexbox();
    @include flex-direction(column);
    @include align-items();
    img {
      @include text-align();
      // @include rect(0.45rem, 0.45rem);
    }
    p {
      @include text-align();
    }
  }
}
</style>
