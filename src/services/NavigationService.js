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

    navigateToAddIngredientView() {
        router.push({name: 'recipeIngredientRoute'})
    },

}