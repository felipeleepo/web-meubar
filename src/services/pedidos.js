import { http } from "./config";

export default {
    verItens : () => {
        return http.get('itens')
    },
    solicitarPedido : (pedido) => {
        return http.post('pedidos', pedido)
    },
    visualizarPedidos : () => {
        return http.get('pedidos/visualizar')
    },
    visualizarPedidosCozinha : () => {
        return http.get('pedidos/cozinha')
    }
}