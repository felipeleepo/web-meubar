import { http } from "./config";

export default {
    verItensAtivos : () => {
        return http.get('itens/ativos')
    },
    solicitarPedido : (pedido) => {
        return http.post('pedidos', pedido)
    },
    visualizarPedidos : () => {
        return http.get('pedidos/visualizar')
    }
}