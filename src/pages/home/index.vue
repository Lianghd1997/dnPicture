<template>
    <view>
        首页
        <text class="iconfont icon-zhuye"></text>
        <uni-badge text="1"></uni-badge>
        <uni-badge text="2" type="success"></uni-badge>
        <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
    </view>
</template>

<script>
    import { uniBadge } from '@dcloudio/uni-ui'
    export default {
        name: "home",
        components: {
            uniBadge
        }
    }
</script>

<style scoped>


</style>
