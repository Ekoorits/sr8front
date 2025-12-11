import axios from "axios";

export default {

    searchRecipes({ text, cookingTimeId, difficultyId, mealTypeId, sort }) {
        return axios.get("/recipes", {
            params: {
                searchText: text || "",
                mealTypeId: mealTypeId || null,
                difficultyId: difficultyId || null,
                cookingTimeId: cookingTimeId || null,
                sort: sort || "NEWEST",
            },
        });
    },

    sendGetRecipeIngredientRequest() {
        return axios.get('/ingredients');
    },
}