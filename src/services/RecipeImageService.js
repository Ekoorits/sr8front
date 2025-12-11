import axios from "axios";

export default {
    getRecipeImage(recipeId) {
        return axios.get("/recipe/image", {
            params: {
                recipeId: recipeId},
        })
    },
}