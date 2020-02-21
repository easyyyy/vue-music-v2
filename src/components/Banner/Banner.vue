<template>
    <div class="wrapper">
      <swiper :options="swiperOption" v-if="bannersData.length > 1">
        <swiper-slide v-for="banner in bannersData" :key="banner.coverImg">
          <img :src="banner.coverImg" class="swiper-img" @click="clickBanner(banner.url)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      bannersData: {},
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 5000
        },
        loop: true
      }
    }
  },
  mounted () {
    this.getBannerByApi()
  },
  methods: {
    getBannerByApi () {
      this.$axios.get(this.$localMusicApi + '/banner/date?time=2020/01/10').then(this.getBannerSucc)
    },
    getBannerSucc (res) {
      this.bannersData = res.data.data
    },
    clickBanner (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 38.66%
    .swiper-img
      width 100%
</style>
