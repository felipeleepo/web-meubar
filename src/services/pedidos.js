import { http } from "./config";

export default {
    verItens : () => {
        return http.get('itens')
    },
    solicitarPedido : (pedido) => {
        return http.post('pedidos', pedido)
    }
}