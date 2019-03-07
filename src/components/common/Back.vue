<template>
    <span @click="$router.history.go(-1)" class="back"><img src="../../../static/icon/back.png" alt=""></span>
</template>
<script>
export default {
    name:'back',
}
</script>

<style lang="scss">
@import '@/qunar/reset.scss';
span.back{
    position: absolute;
    top: 0;
    left: 0;
    @include rect(auto,0.5rem);
    @include flexbox();
    @include justify-content();
    @include align-items();
    img{
        @include rect(0.3rem,0.3rem);
    }
}
</style>

