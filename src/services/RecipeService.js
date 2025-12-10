import axios from "axios";

export default {
    sendGetRecipeRequest(recipeId) {
        return axios.get('/recipe', recipeId);
    },

    sendPostRecipeDetailRequest(newRecipe) {
        return axios.post('/recipe/detail', newRecipe)
    },

    sendGetRecipesRequest(searchParam, cookingTimeId, difficultyId, mealTypeId, sort) {
        return axios.get('/recipes', {
            params: {
                searchParam: searchParam || "",     // как было раньше
                cookingTimeId: cookingTimeId ?? null,
                difficultyId: difficultyId ?? null,
                mealTypeId: mealTypeId ?? null,
                sort: sort || "NEWEST",
            }
        })
    },
}