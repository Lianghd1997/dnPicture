<template>
    <view class="home_tab">
        <view class="home_tab_title">
            <view class="title_inner">
                <uni-segmented-control :current="current" :values="items.map(v => v.title)"
                                       @clickItem="onClickItem"
                                       style-type="text" active-color="#D4237A"></uni-segmented-control>
            </view>
            <view class="iconfont icon-search"></view>
        </view>
        <view class="home_tab_content">
            <view v-show="current === 0">
                <home-recommend></home-recommend>
            </view>
            <view v-show="current === 1">
                <home-category></home-category>
            </view>
            <view v-show="current === 2">
                <home-new></home-new>
            </view>
            <view v-show="current === 3">
                <home-album></home-album>
            </view>
        </view>
    </view>
</template>

<script>
    import homeRecommend from './home-recommend'
    import homeCategory from './home-category'
    import homeNew from './home-new'
    import homeAlbum from './home-album'
    import { uniSegmentedControl } from '@dcloudio/uni-ui'
    export default {
        name: "home",
        components: {
            homeRecommend,
            homeCategory,
            homeNew,
            homeAlbum,
            uniSegmentedControl
        },
        data () {
            return {
                items: [
                    {title: '推荐'},
                    {title: '分类'},
                    {title: '最新'},
                    {title: '专辑'}
                    ],
                current: 0
            }
        },
        methods: {
            onClickItem (e) {
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.home_tab {
    .home_tab_title {
        position: relative;
        .title_inner {
            width: 60%;
            margin: 0 auto;
        }
        .icon-search {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            right: 5%;
        }
    }
    .home_tab_content {
    }

}

</style>
