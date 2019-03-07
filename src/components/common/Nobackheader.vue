<template>
    <div class="backheader">
        <div class="topTitle"><img src="../../../static/icon/backheader.png" alt=""></div>
        
    </div>
</template>
<script>
export default {
    name:'nobackheader',
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
.backheader{
    @include rect(100%,0.5rem);
    div.topTitle{
        @include rect(100%,100%);
        @include flexbox();
        @include justify-content();
        @include align-items();
        @include padding();
        img{
            @include rect(100%,auto);
        }
    }
}

</style>
