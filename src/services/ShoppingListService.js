import axios from "axios";

export default {

    sendAddRecipeToShoppingListRequest(recipeId, shoppingListId) {
        return axios.post('/recipe/shopping-list', null, {
            params: {
                recipeId: recipeId,
                shoppingListId: shoppingListId,
            }
        })
    },
}