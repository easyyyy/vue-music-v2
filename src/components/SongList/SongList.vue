<template>
    <div class="songlist">
      <div class="song" v-for="(song,index) in playlist" :key="index">
        <div class="song-num">{{index+1}}</div>
        <div class="song-div">
          <div class="song-info">
            <div class="song-title">{{song.name}}</div>
            <div class="song-artist-album" v-if="song.artist">{{song.artist.name}} - {{song.album.name}}</div>
          </div>
          <div class="song-operate">
            <div class="play-icon" @click="clickSongPlay(song.id)">
              <span class="iconfont">&#xe601;</span>
            </div>
            <div class="more-button" @click="moreButton(index)">
              <span class="iconfont">&#xe67f;</span>
            </div>
            <van-action-sheet
              v-model="show"
              :actions="actions"
              @select="onSelect"
              :lazy-render="false"
              :round="true"
              style="z-index:100"
            ></van-action-sheet>
          </div>
        </div>
      </div>
      <div class="artists" v-show="artistShow" v-if="this.playlist">
        <div v-if="this.playlist[0]">
          <van-popup v-model="artistShow">
            <div class="artists-item" v-if="this.playlist[this.clickId].artist" @click="clickArtist()">{{playlist[this.clickId].artist.name}}</div>
          </van-popup>
        </div>
      </div>
      <div class="playlists" v-show="playlistShow" v-if="this.playlist">
        <div>
          <van-popup v-model="playlistShow">
            <div class="collect-title">收藏到歌单</div>
            <div class="create-playlist">
              <div class="create-icon">
                <span class="iconfont">&#xe652;</span>
              </div>
              <div class="create-text">新建歌单</div>
            </div>
            <div v-for="item in createrPlaylist" :key="item.index">
              <div class="playlists-item" @click="addSongToPlaylist(item.id)">
                <div class="playlist-img"><img :src="item.coverImg" alt=""></div>
                <div class="playlist-info">
                  <div class="playlist-name">{{item.name}}</div>
                  <div class="playlist-length">{{item.songs.split(',').length}}首</div>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
      <div class="space-div"></div>
    </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    playlist: Array
  },
  data () {
    return {
      artistShow: false,
      playlistShow: false,
      playingSongId: 0,
      show: false,
      clickId: 0,
      actions: [
        { name: '添加到下一首播放' },
        { name: '添加到歌单' },
        { name: '查看歌手详情' },
        { name: '查看专辑' },
        { name: '选项', subname: '描述信息' }
      ],
      createrPlaylist: []
    }
  },
  computed: {
  },
  methods: {
    clickArtist () {
      this.$router.push({
        name: 'artist',
        params: {
          id: this.playlist[this.clickId].artist.id
        }
      })
    },
    clickSongPlay (id) {
      this.playingSongId = id
      for (var i in this.playlist) {
        if (this.playlist[i].id === id) {
          var music = {
            id: this.playlist[i].id,
            src: this.playlist[i].url,
            pic: this.playlist[i].coverImg,
            title: this.playlist[i].name,
            artist: this.playlist[i].artist
          }
          this.$store.dispatch('setMusicInfoAndPlaylist', music)
        }
      }
      // this.$axios(this.$musicApi + '/song/url?id=' + id).then(this.clickSongPlaySucc)
    },
    moreButton (index) {
      this.show = true
      this.onClickSongOperate(index)
    },
    changeShow () {
      this.show = false
    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      switch (item.name) {
        case '添加到下一首播放' :
          this.insertSongPlaySucc(this.clickId)
          // console.log('添加到下一首播放' + this.clickId)
          // this.$axios(this.$musicApi + '/song/url?id=' + this.playlist[this.clickId].id).then(this.insertSongPlaySucc)
          // this.$store.dispatch('insertPlaylist', { item: this.playlist[this.clickId], index: 1 })
          break
        case '查看歌手详情' :
          this.artistShow = !this.artistShow
          break
        case '查看专辑' :
          this.clickAlbum()
          break
        case '添加到歌单':
          if (this.$store.state.user === '') {
            this.$toast('请登录！')
            break
          }
          this.clickAddToPlaylist()
          this.playlistShow = !this.playlistShow
          break
      }
    },
    clickAddToPlaylist () {
      this.$axios.get(this.$localMusicApi + '/playlist/create/uid?uid=' + this.$store.state.user.id).then(this.getCreatePlayListsSucc)
    },
    getCreatePlayListsSucc (res) {
      this.createrPlaylist = res.data.data
    },
    clickAlbum () {
      this.$router.push({
        name: 'AlbumDetail',
        params: {
          id: this.playlist[this.clickId].album.id
        }
      })
    },
    insertSongPlaySucc (clickNum) {
      var music = {
        id: this.playlist[clickNum].id,
        src: this.playlist[clickNum].url,
        pic: this.playlist[clickNum].coverImg,
        title: this.playlist[clickNum].name,
        artist: this.playlist[clickNum].artist
      }
      this.$store.dispatch('insertPlaylist', { item: music, index: 1 })
    },
    onClickSongOperate (index) {
      this.clickId = index
    },
    // 原网易云api数据使用 点击播放 废弃
    // clickSongPlaySucc (res) {
    //   var url = ''
    //   url = res.data.data[0].url
    //   if (url === null) {
    //     this.$toast('应版权要求无法播放')
    //     return
    //   }
    //   var picUrl
    //   var title
    //   var artist
    //   for (var i in this.playlist) {
    //     if (this.playlist[i].id === this.playingSongId) {
    //       if (this.playlist[i].al) {
    //         picUrl = this.playlist[i].al.picUrl
    //         title = this.playlist[i].name
    //         artist = this.playlist[i].ar
    //       } else {
    //         this.getSongDetail(this.playlist[i].id)
    //         title = this.playlist[i].name
    //         artist = this.playlist[i].artists[0].name
    //       }
    //     }
    //   }
    //   var music = {
    //     src: url,
    //     pic: picUrl,
    //     title: title,
    //     artist: artist
    //   }
    //   this.$store.dispatch('setMusicInfoAndPlaylist', music)
    // },
    async getSongDetail (id) {
      await this.$axios.get(this.$musicApi + '/song/detail?ids=' + id).then(this.getSongDetailSucc)
    },
    getSongDetailSucc (res) {
      this.$store.dispatch('setMusicInfoPicUrl', res.data.songs[0].al.picUrl)
    },
    addSongToPlaylist (playlistId) {
      this.$axios.post(this.$localMusicApi + '/playlist/add/song', {
        songId: this.playlist[this.clickId].id,
        playlistId: playlistId,
        token: this.$store.state.user.token,
        email: this.$store.state.user.email
      }).then(this.addSongToPlaylistSucc)
    },
    addSongToPlaylistSucc (res) {
      if (res.data.data) {
        this.$toast('收藏成功！')
      } else {
        this.$toast(res.data.msg)
        this.$store.dispatch('setUser', '')
        this.$router.push({
          name: 'user'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixins.styl"
  .songlist
    height auto
  .song
    display flex
    flex-direction row
    height .9rem
    margin-top .1rem
    margin-bottom .1rem
    .song-num
      height .8rem
      width .7rem
      text-align center
      line-height .8rem
      color #808080
    .song-div
      display flex
      flex-direction row
      border-bottom #DDDDDD solid 1px
      .song-info
        width 4.5rem
        margin-left .2rem
        .song-title
          line-height .4rem
          ellipse()
        .song-artist-album
          line-height:.4rem
          font-size .25rem
          color #808080
          ellipse()
      .song-operate
        display flex
        flex-direction row
        .play-icon
          text-align center
          line-height .8rem
          span
            font-size .6rem
            color #808080
        .more-button
          text-align center
          line-height .8rem
          margin-left: .8rem
          span
            font-size .45rem
            color #808080
  .artists
    div
      width 3rem
      .artists-item
        /*line-height .6rem*/
        text-align center
  .playlists
      display: flex
      flex-direction column
      margin-bottom .1rem
      .collect-title
        height .85rem
        font-weight bold
        font-size .35rem
        margin-top .2rem
        margin-left .2rem
      .create-playlist
        height .85rem
        display flex
        flex-direction row
        .create-icon
          margin-left .2rem
          height 1rem
          width 1rem
          background-color #E8E8E8
          text-align center
          span
            line-height 1rem
            text-align center
            color #D33A31
            font-size .4rem
        .create-text
          margin-left .2rem
          line-height 1rem
          text-align center

      .playlists-item
        margin-top .15rem
        margin-bottom .15rem
        display: flex
        flex-direction row
        width 5rem
        line-height 1.2rem
        text-align center
        .playlist-img
          margin-left .2rem
          img
            height 1rem
            width 1rem
        .playlist-info
          display: flex
          flex-direction column
          line-height 1.2rem
          .playlist-name
            margin-left .2rem
            line-height .7rem
          .playlist-length
            margin-left .1rem
            line-height .5rem
            font-size .2rem
            color #999999
  .space-div
    width 100%
    height 1rem
</style>
