<template>
    <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
            <span class="iconfont icon-shouye"></span>
            <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
            <span class="iconfont icon-leimupinleifenleileibie2"></span>
            <p>分类</p>
        </router-link>
        <router-link to="/news" tag="li">
            <span class="iconfont icon-xinwen"></span>
            <p>新闻</p>
        </router-link>
        <router-link to="/cart" tag="li">
            <span class="iconfont icon-ziyuan"></span>
            <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
            <span class="iconfont icon-huiyuan21"></span>
            <p>会员</p>
        </router-link>
      </ul>
    </footer>
</template>

<script>
export default {
    
}
</script>
