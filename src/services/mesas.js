import { http } from "./config";

export default {
    getMesa : () => {
        return http.get('mesas')
    }
}