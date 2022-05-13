import { http } from "./config";

export default {
    getGrupos : () => {
        return http.get('grupos')
    },
    getGruposId : (id_mesa) => {
        return http.get('grupos/mesa', {
            params:{
                id_mesa: id_mesa
            }
        })
    },
    updateGrupos : (dados) => {
        return http.patch('grupos', dados)
    }
}