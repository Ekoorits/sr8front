import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RecipeDetailsView from "@/views/RecipeDetailsView.vue";
import RecipeIngredientView from "@/views/RecipeIngredientView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/search',
        name: 'searchRoute',
        component: SearchView
    },
    {
        path:'/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path:'/recipe/detail',
        name: 'recipeDetailsRoute',
        component: RecipeDetailsView
    },
    {
        path: '/recipe/ingredient',
        name: 'recipeIngredientRoute',
        component: RecipeIngredientView
    }




]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
