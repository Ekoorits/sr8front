import axios from "axios";

export default {
    sendGetDifficultiesRequest() {
        return axios.get('/difficulties');
    },
}