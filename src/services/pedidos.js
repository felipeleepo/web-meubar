import { http } from "./config";

export default {
    solicitarPedido : () => {
        return http.post('pedidos')
    }
}