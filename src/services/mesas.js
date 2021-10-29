import { http } from "./config";

export default {
    getMesa : () => {
        return http.get('mesas')
    },
    getMesasEmAtendimento : () => {
        return http.get('mesas/1')
    }
}