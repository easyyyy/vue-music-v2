<template>
    <div>
      <div class="playlist-header" v-show="showAbs">
        <div @click="$router.back(-1)" class="back">
          <span class="iconfont">&#xe626;</span>
        </div>
        <div class="playlist-text">歌单</div>
      </div>
      <div class="playlist-info" ref="playlistInfo">
        <div class="background">
          <img :src="playlistInfo.coverImg" alt="">
        </div>
        <div class="info">
          <div class="playlist-img">
            <img :src="playlistInfo.coverImg">
          </div>
          <div class="playlist-title">{{playlistInfo.name}}</div>
          <div class="playlist-creator" v-if="playlistInfo.creator">
            <div>
              <van-image
                round
                width=".6rem"
                height=".6rem"
                :src="playlistInfo.creator.avatarImg"
              />
            </div>
            <div style="margin-left: .2rem;font-size: .28rem;line-height: .6rem;text-align: center">{{playlistInfo.creator.name}}</div>
            <div>
              <span class="iconfont" style="font-size: .24rem;margin-left: .15rem">&#xe667;</span>
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
        <div v-if="playlistIdInuserCreatePlaylist">
        </div>
        <div v-else-if="playlistIdInuserCollectPlaylist" class="collected" @click="clickCancelCollectBotton">
          <span class="iconfont" style="font-size: .6rem">&#xe605;</span>
        </div>
        <div class="collection" @click="clickCollectBotton" v-else>收藏</div>
      </div>
      <SongList :playlist="playlist"></SongList>
    </div>
</template>

<script>
import SongList from '../components/SongList/SongList'
export default {
  name: 'SongListDetail',
  components: {
    SongList
  },
  data () {
    return {
      user: this.$store.state.user,
      trackIds: [],
      playlist: [],
      playlistInfo: {},
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  mounted () {
    this.getPlaylistSongId()
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    playlistIdInuserCreatePlaylist () {
      if (this.user.playLists) {
        var list = this.user.playLists.split(',')
        var l = []
        for (var i in list) {
          l.push(parseInt(list[i]))
        }
        for (var j in l) {
          if (l[j] === this.playlistInfo.id) {
            return true
          }
        }
      } else {
        return false
      }
    },
    playlistIdInuserCollectPlaylist () {
      if (this.user.collectionPlaylists) {
        var list = this.user.collectionPlaylists.split(',')
        var l = []
        for (var i in list) {
          l.push(parseInt(list[i]))
        }
        for (var j in l) {
          if (l[j] === this.playlistInfo.id) {
            return true
          }
        }
      } else {
        return false
      }
    }
  },
  methods: {
    clickCollectBotton () {
      if (this.user !== '') {
        this.$axios.get(this.$localMusicApi + '/user/collection/add?userId=' + this.user.id + '&id=' + this.playlistInfo.id + '&token=' + this.user.token).then(this.clickCollectBottonSucc)
      } else {
        this.$toast('请先登录')
      }
    },
    clickCollectBottonSucc (res) {
      if (!res.data.data) {
        this.$toast(res.data.msg)
        this.$store.dispatch('setUser', '')
        this.$router.push({
          name: 'user'
        })
      } else {
        this.$toast('歌单收藏成功！')
        this.user.collectionPlaylists = res.data.data
        this.$store.dispatch('setUserCollectPlaylist', res.data.data)
      }
    },
    clickCancelCollectBotton () {
      this.$axios.get(this.$localMusicApi + '/user/collection/delete?userId=' + this.user.id + '&id=' + this.playlistInfo.id + '&token=' + this.user.token).then(this.clickCancelCollectBottonSucc)
    },
    clickCancelCollectBottonSucc (res) {
      if (res.data.msg) {
        this.$toast(res.data.msg)
        this.$store.dispatch('setUser', '')
        this.$router.push({
          name: 'user'
        })
      } else {
        this.$toast('歌单取消收藏成功！')
        this.user.collectionPlaylists = res.data.data
        this.$store.dispatch('setUserCollectPlaylist', res.data.data)
      }
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 200) {
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    },
    getPlaylistSongId () {
      // this.$axios.get(this.$musicApi + '/playlist/detail?id=' + this.$route.params.id).then(this.getPlaylistSongIdSucc)
      this.$axios.get('http://localhost:8090/playlist?ids=' + this.$route.params.id).then(this.getPlaylistSongIdSuccV2)
    },
    getPlaylistSongIdSuccV2 (res) {
      this.playlistInfo = res.data.data[0]
      var songs = res.data.data[0].songVos
      this.playlist = songs
    },
    getPlaylistSuccV2 (res) {
    },
    playAll () {
      var songList = []
      for (var i in this.playlist) {
        var music = {
          id: this.playlist[i].id,
          src: this.playlist[i].url,
          pic: this.playlist[i].coverImg,
          title: this.playlist[i].name,
          artist: this.playlist[i].artist
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
      .playlist-creator
        position absolute
        margin-top 1.7rem
        margin-left 3.45rem
        font-size .35rem
        font-weight normal
        color #DFDDDF
        display flex
        flex-direction row
        line-height .6rem
        text-align center
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
    .collected
      border-top-right-radius .3rem
      /*background-color #C20C0C*/
      width 30%
      text-align center
      line-height .8rem
      font-size .6rem
</style>
