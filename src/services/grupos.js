import { http } from "./config";

export default {
    getGrupos : () => {
        return http.get('grupos')
    }
}