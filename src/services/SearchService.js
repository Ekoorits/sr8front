import axios from "axios";

export default {
    sendGetRecipeIngredientRequest() {
        return axios.get('/ingredients');
    },
}