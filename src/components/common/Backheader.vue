<template>
    <div class="backheader">
        <Back/>
        <div class="topTitle"><img src="../../../static/icon/backheader.png" alt=""></div>
        
    </div>
</template>
<script>
import Back from "@/components/common/Back";

export default {
    name:'backheader',
    components:{Back}
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
.backheader{
    position: relative;
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
