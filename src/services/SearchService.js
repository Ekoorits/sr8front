import axios from "axios";

export default {
    sendGetIngredientRequest() {
        return axios.get('/ingredients/all');
    },
}