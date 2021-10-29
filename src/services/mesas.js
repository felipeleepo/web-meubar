import { http } from "./config";

export default {
    getMesa : () => {
        return http.get('mesas/visualizar')
    },
    getMesasEmAtendimento : () => {
        return http.get('mesas/atendimento')
    }
}