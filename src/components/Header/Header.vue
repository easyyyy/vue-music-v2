<template>
  <div class="header">
    <div class="music-icon">
      <div>
        <span class="iconfont" id="musicIcon">&#xe628;</span>
      </div>
      <div class="header-title">
        <span>Music</span>
      </div>
    </div>
    <div class="personal-center" @click="clickUser">
      <span class="iconfont" v-if="!avatarUrl" id="personalCenter">&#xe604;</span>
        <van-image
          v-if="avatarUrl"
          round
          width=".55rem"
          height=".55rem"
          style="margin-right: .1rem;margin-top: .1rem"
          :src="avatarUrl"
        />
    </div>
<!--    <div class="nav-tabs">-->
<!--      <div class="tab-container" @click = "clickTab($event)" id="recommend" ref="recommend">推荐</div>-->
<!--      <div class="tab-container" @click = "clickTab($event)" id="ranking" ref="ranking">排行榜</div>-->
<!--      <div class="tab-container" @click = "clickTab($event)" id="search" ref="search"> 搜索</div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    routePath: String
  },
  data () {
    return {
      tabChoice: {
        recommend: true,
        ranking: false,
        search: false
      }
    }
  },
  computed: {
    avatarUrl: function () {
      if (this.$store.state.user) {
        return this.$store.state.user.avatar_img
      } else {
        return false
      }
    }
  },
  mounted () {
    // document.getElementById('recommend').style.color = 'red'
  },
  watch: {
  },
  methods: {
    clickUser () {
      this.$router.push({
        name: 'user',
        params: {
        }
      })
    },
    clickTab (e) {
      for (var i in this.tabChoice) {
        this.tabChoice[i] = false
        document.getElementById(i).style.color = 'black'
      }
      this.tabChoice[e.target.id] = true
      e.target.style.color = 'red'
      this.$emit('choiceTab', this.tabChoice)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    display flex
    flex-direction row
    .music-icon
      width 100%
      height .8rem
      flex-direction row
      display: flex;
      justify-content: center;
      align-items: center;
      #musicIcon
        font-size .5rem
      .header-title
        margin-left .2rem
        font-size .35rem
        font-family: 'Montserrat', sans-serif;
    #personalCenter
      position absolute
      right .2rem
      font-size .5rem
      line-height .8rem
      justify-content: center;
      align-items: center;
</style>
