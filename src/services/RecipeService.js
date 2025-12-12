import axios from "axios";

export default {


    sendPostRecipeDetailRequest(newRecipe) {
        return axios.post('/recipe/detail', newRecipe)
    },

    sendGetRecipesRequest (searchParam, cookingTimeId, difficultyId, mealTypeId, sort) {
        return axios.get('/recipes', {
            params: {
                searchParam: searchParam,
                cookingTimeId: cookingTimeId,
                difficultyId: difficultyId,
                mealTypeId: mealTypeId,
                sort: sort
            }
        })
    },
    sendGetFilteredRecipesRequest (mealTypeId, difficultyId, cookingTimeId) {
        const params = {}

        if (mealTypeId != null) {
            params.mealTypeId = mealTypeId
        }
        if (difficultyId != null) {
            params.difficultyId = difficultyId
        }
        if (cookingTimeId != null) {
            params.cookingTimeId = cookingTimeId
        }

        return axios.get('/recipes/filter', { params })
    }

,

    sendGetUserRecipes(userId){
        return axios.get('/my-recipes',{
            params: {
                userId: userId
            }
        })
    },

    getRecipe(recipeId) {
        return axios.get('/recipe', {
            params: {
                recipeId: recipeId
            }
        })
    },

    getRecipeIngredients(recipeId) {
        return axios.get('/recipe/ingredients', {
            params: {
                recipeId: recipeId
            }
        })
    }
}