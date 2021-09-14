import Vue from 'vue'
import VueRouter from 'vue-router'
import Mesas from '../views/Mesas.vue'
import SolicitarPedido from '../views/pedidos/SolicitarPedido.vue'
import Cardapio from '../views/Cardapio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mesas',
    component: Mesas
  },
  {
    path: '/pedidos',
    name: 'SolicitarPedido',
    component: SolicitarPedido
  },
  {
    path: '/cardapio',
    name: 'Cardápio',
    component: Cardapio
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
