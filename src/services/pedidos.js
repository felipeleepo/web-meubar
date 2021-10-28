import { http } from "./config";

export default {
    verItens : () => {
        return http.get('itens')
    },
    solicitarPedido : () => {
        return http.post('pedidos')
    }
}