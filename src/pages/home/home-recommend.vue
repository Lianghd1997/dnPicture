<template>
    <scroll-view class="recommend_view" scroll-y
                 v-if="recommendList.length > 0"
                 @scrolltolower="handleToLower">
        <!--推荐模块-->
        <view class="recommend_wrap">
            <view class="recommend_item"
                  v-for="item in recommendList" :key="item.id">
                <image mode="widthFix" :src="item.thumb"></image>
            </view>
        </view>

        <!--月份模块-->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text> {{monthList.DD + ' / '}}</text> {{monthList.MM}} 月
                    </view>
                    <view class="months_text">{{monthList.title}}</view>
                </view>
                <view class="months_title_more">更多 > </view>
            </view>
            <view class="months_content">
                <view class="months_item" v-for="item in monthList.items" :key="item.id">
                    <image :src="item.thumb + item.rule.replace('$<Height>', 360)" mode="aspectFill"></image>
                </view>
            </view>
        </view>

        <!--热门模块-->
        <view class="hot_wrap">
            <view class="hot_title">
                <text> 热门 </text>
            </view>
            <view class="hot_content">
                <view class="hot_item" v-for="item in hotList" :key="item.id">
                    <image mode="widthFix" :src="item.thumb"></image>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        name: "home-recommend",
        data () {
            return {
                recommendList: [],   // 推荐列表
                monthList: {},      // 月份
                hotList: [],        // 热门列表
                // 请求参数
                params: {
                    limit: 30,   // 获取条数
                    order: 'hot',
                    skip: 0
                },
                hasMore: true
            }
        },
        mounted () {
            this.getImgList()
        },
        methods: {
            // 获取图片数据
            getImgList () {
                this.$request({
                    url: 'http://service.picasso.adesk.com/v3/homepage/vertical',
                    data: this.params
                }).then(result => {
                    if (result.res.vertical.length === 0) {
                        this.hasMore = false
                    } else {
                        if (this.recommendList.length === 0) {
                            // 推荐模块
                            this.recommendList = result.res.homepage[1].items
                            // 月份模块
                            this.monthList = result.res.homepage[2]
                            this.monthList.MM = String(new Date((this.monthList.stime)).getMonth()).padStart(2, '0')
                            this.monthList.DD = String(new Date((this.monthList.stime)).getDate()).padStart(2, '0')
                        }
                        // 热门模块
                        this.hotList = [...this.hotList, ...result.res.vertical]
                    }
                })
            },
            // 滚动条触底事件
            handleToLower () {
                /*
                1. 修改参数 skip += limit
                2. 重新发送请求 getImgList()
                3. hotList数据叠加
                 */
                if (this.hasMore) {
                    this.params.skip += this.params.limit
                    this.getImgList()
                } else {
                    uni.showToast({
                        title: '没有更多数据了...',
                        icon: 'none'
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.recommend_view {
    // height = 屏幕高度 - 头部标题高度
    height: calc( 100vh - 36px );
}

.recommend_wrap {
    display: flex;
    flex-wrap: wrap;
    .recommend_item {
        width: 50%;
        border: 5rpx solid #fff;
    }
}

.months_wrap {
    .months_title {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .months_title_info {
            color: $theme-color;
            font-size: 30rpx;
            font-weight: 600;
            display: flex;
            .months_info {
                text {
                   font-size: 36rpx;
                }
            }
            .months_text {
                font-size: 34rpx;
                color: #666;
                margin-left: 30rpx;
            }
        }
        .months_title_more {
            color: $theme-color;
            font-size: 24rpx;
        }
    }
    .months_content {
        display: flex;
        flex-wrap: wrap;
        .months_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}

.hot_wrap {
    .hot_title {
        padding: 20rpx;
        text {
            border-left: 10rpx solid $theme-color;
            font-size: 34rpx;
            padding-left: 20rpx;
            font-weight: 600;
        }
    }
    .hot_content {
        display: flex;
        flex-wrap: wrap;
        .hot_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}

</style>
