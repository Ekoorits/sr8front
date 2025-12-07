import axios from "axios";

export default {
    sendGetMealTypesRequest() {
        return axios.get('/mealtypes');
    },
}