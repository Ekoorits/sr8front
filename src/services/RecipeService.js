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

    sendGetUserRecipes(userId){
        return axios.get('/my-recipes',{
            params: {
                userId: userId
            }
        })
    },

    sendGetRecipe(recipeId) {
        return axios.get('/recipe', {
            params: {
                recipeId: recipeId
            }
        })
    },
}