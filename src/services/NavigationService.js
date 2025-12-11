import router from "@/router";

export default {

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToSearchView() {
        router.push({name: 'searchRoute'})
    },

    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },

    navigateToNotAuthorizedView() {
        router.push({name: 'notAuthorizedRoute'})
    },

    navigateToRecipeDetailsView(){
        router.push({name: 'recipeDetailsRoute'})
    },

    navigateToAddIngredientView(recipeId) {
        router.push({
            name: 'recipeIngredientRoute',
            query: {
                recipeId: recipeId
            }
        })
    },

    navigateToHomeViewUserLoggedIn() {
        router.push({name:'homeRouteUserLoggedIn'})
    },

    navigateToMyRecipesView() {
        router.push({name: 'myRecipesRoute'})
    },

    navigateToRecipeView(recipeId) {
        router.push({
            name: 'recipeRoute',
            params: {
                recipeId: recipeId
            }
        })
    },
    navigateToShoppingListsView() {
        router.push({name: 'shoppingListsRoute'})
    },

    navigateToShoppingListView() {
        router.push({name: 'shoppingListRoute'})
    },

    navigateToShoppingRecipesView() {
        router.push({name: 'shoppingRecipesRoute'})
    },

}