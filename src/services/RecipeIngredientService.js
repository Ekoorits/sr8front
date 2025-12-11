import axios from "axios";

export default {

    sendPostAddRecipeIngredientRequest(recipeId, ingredientId, ingredientAmount) {
        return axios.post('/recipe/ingredient', null, {
            params: {
                recipeId: recipeId,
                ingredientId: ingredientId,
                ingredientAmount: ingredientAmount
            }
        })
    },

    sendGetRecipeIngredientsRequest(recipeId) {
        return axios.get('/recipe/ingredients',{
            params: {
                recipeId: recipeId
            }
        })
    },

    sendDeleteRecipeIngredientRequest(recipeIngredientId) {
        return axios.delete('/recipe/ingredient', {
            params: {
                recipeIngredientId: recipeIngredientId
            }
        })
    },
}