import axios from "axios";

export default {
    sendGetCookingTimeRequest() {
        return axios.get('/cookingtime');
    },
}