<template>
  <div>
    <div class="playlist-header" v-show="showAbs">
      <div class="back" @click="clickBack">
        <span class="iconfont">&#xe626;</span>
      </div>
      <div class="playlist-text">专辑</div>
    </div>
    <div class="playlist-info" ref="playlistInfo">
      <div class="background">
        <img :src="album.coverImg" alt="">
      </div>
      <div class="info">
        <div class="playlist-img">
          <img :src="album.coverImg">
        </div>
        <div class="playlist-title">{{album.name}}</div>
        <div class="album-artist-info">
          <div class="album-artist" v-if="album.artist" @click="clickArtist">
            <div>歌手: {{album.artist.name}}</div>
            <div>
              <span class="iconfont" style="font-size: .24rem;margin-left: .15rem">&#xe667;</span>
            </div>
          </div>
          <div class="album-release-time">
            <div>发行时间: {{album.releaseTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="playAll-collection">
      <div class="playAll">
        <span class="iconfont">&#xe601;</span>
        <div @click="playAll">
          播放全部
        </div>
      </div>
      <div class="collection">收藏</div>
    </div>
    <SongList :playlist="album.songs"></SongList>
  </div>
</template>

<script>
import SongList from '../SongList/SongList'
export default {
  name: 'AlbumDetail',
  components: {
    SongList
  },
  data () {
    return {
      songs: [],
      album: {},
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  mounted () {
    this.getAlbumSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    clickArtist () {
      this.$router.push({
        name: 'artist',
        params: {
          id: this.album.artist.id
        }
      })
    },
    clickBack () {
      this.$router.go(-1)
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 200) {
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    },
    getAlbumSongs () {
      this.$axios.get(this.$localMusicApi + '/album?id=' + this.$route.params.id).then(this.getAlbumSongsSucc)
    },
    getAlbumSongsSucc (res) {
      this.album = res.data.data
      var d = this.album.releaseTime
      this.album.releaseTime = d
    },
    playAll () {
      var songList = []
      var songs = this.album.songs
      for (var i in songs) {
        var music = {
          id: songs[i].id,
          src: songs[i].url,
          pic: songs[i].coverImg,
          title: songs[i].name,
          artist: songs[i].artist
        }
        songList.push(music)
      }
      this.$store.dispatch('setMusicPlaylist', songList)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .playlist-header
    width: 100%
    height .8rem
    display flex
    flex-direction row
    position fixed
    top 0
    left 0
    right 0
    z-index 10
    .back
      color white
      line-height .8rem
      margin-left .25rem
      span
        font-size .4rem
    .playlist-text
      margin-left .3rem
      line-height .8rem
      font-size .35rem
      color white
  .playlist-info
    z-index 1
    height 5rem
    .background
      img
        position: absolute;
        height: 5rem;
        width: 100%;
        top: 0;
        -webkit-filter: blur(40px);
        filter: blur(40px);
    .info
      position absolute
      display flex
      flex-direction row
      z-index 5
      top: 1.2rem
      width 100%
      .playlist-img
        width 2rem
        margin-left .6rem
        margin-top .4rem
        img
          height 2.5rem
          width 2.5rem
      .playlist-title
        margin-top: .6rem
        margin-left .85rem
        margin-right .3rem
        font-weight bold
        font-size .35rem
        color white
      .album-artist-info
        position absolute
        margin-top 1.7rem
        margin-left 3.45rem
        font-size .26rem
        font-weight normal
        color #DFDDDF
        display flex
        flex-direction column
        .album-artist
          display flex
          flex-direction row
        .album-release-time
          margin-top .15rem
  .playAll-collection
    border-top-left-radius .3rem
    border-top-right-radius .3rem
    flex-direction row
    display flex
    position relative
    width 100%
    height .8rem
    .playAll
      width 70%
      line-height .8rem
      text-align center
      font-size .3rem
      display flex
      flex-direction row
      span
        font-size .5rem
        margin-right .2rem
        margin-left   1.2rem
    .collection
      border-top-right-radius .3rem
      background-color #C20C0C
      width 30%
      text-align center
      line-height .8rem
      font-size .3rem
      color white
</style>
