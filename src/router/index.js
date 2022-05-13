import Vue from 'vue'
import VueRouter from 'vue-router'
import Mesas from '../views/Mesas.vue'
import SolicitarPedido from '../views/pedidos/SolicitarPedido.vue'
import VisualizarPedidos from '../views/pedidos/VisualizarPedidos.vue'
import Cardapio from '../views/Cardapio.vue'
import Cozinha from '../views/Cozinha.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mesas',
    component: Mesas
  },
  {
    path: '/pedidos/solicitar',
    name: 'SolicitarPedido',
    component: SolicitarPedido
  },
  {
    path: '/pedidos/visualizar',
    name: 'VisualizarPedidos',
    component: VisualizarPedidos
  },
  {
    path: '/cardapio',
    name: 'Cardápio',
    component: Cardapio
  },
  {
    path: '/cozinha',
    name: 'Cozinha',
    component: Cozinha
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
