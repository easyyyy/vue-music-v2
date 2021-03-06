import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import PlayListDetail from './views/PlayListDetail'
import Artist from './views/Artist'
import User from './views/User'
import AlbumDetail from './components/AlbumDetail/AlbumDetail'
import Register from './views/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlayListDetail
    },
    {
      path: '/album/:id',
      name: 'AlbumDetail',
      component: AlbumDetail
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: Artist
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/user/register',
      name: 'register',
      component: Register
    }
  ]
})
