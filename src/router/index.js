import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mesas from '../views/Mesas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mesas',
    component: Mesas
  },
  {
    path: '/about',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
