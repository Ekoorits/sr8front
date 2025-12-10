import axios from "axios";

export default {
    sendGetRecipeRequest(recipeId) {
        return axios.get('/recipe', recipeId);
    },

    sendPostRecipeDetailRequest(newRecipe) {
        return axios.post('/recipe/detail', newRecipe)
    },

    sendGetRecipesRequest(searchParam) {
        return axios.get('/recipes', {
            params: {
                searchParam: searchParam
            }
        })
    },
}