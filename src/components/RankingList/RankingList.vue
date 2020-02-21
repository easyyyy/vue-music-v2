<template>
  <div class="ranking-list">
    <!--<div v-for="item in toplist" :key="item.index">-->
      <!--<TopListDetail :item="item"></TopListDetail>-->
    <!--</div>-->
    <SongList :playlist="toplist"></SongList>
  </div>
</template>

<script>

import SongList from '../SongList/SongList';
export default {
  name: 'Index',
  components: {
    SongList
  },
  data () {
    return {
      toplist: []
    }
  },
  mounted () {
    this.getTopListDetail()
  },
  methods: {
    getTopListDetail () {
      this.$axios.get(this.$localMusicApi + '/song/top').then(this.getTopListDetailSucc)
    },
    getTopListDetailSucc (res) {
      this.toplist = res.data.data
    }
  }
}
</script>

<style lang="stylus" scoped>
  .test
    width 100%
    height 10rem
    background-color #25a4bb
</style>
