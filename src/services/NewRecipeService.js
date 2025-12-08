import axios from "axios";

export default {

    sendPostNewRecipeRequest(newRecipe) {
        return axios.post('/recipe/detail/add', newRecipe)
    },
}