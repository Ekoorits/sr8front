import axios from "axios";

export default {

    sendPostAddRecipeIngredientRequest(newRecipeIngredient) {
        return axios.post('/recipe/ingredient/add', newRecipeIngredient)
    },
}