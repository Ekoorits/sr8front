import axios from "axios";

export default {
    sendGetRecipeRequest(recipeId) {
        return axios.get('/recipe', recipeId);
    },
}