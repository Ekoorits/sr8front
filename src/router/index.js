import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RecipeDetails from "@/views/RecipeDetails.vue";

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
        path:'/recipe/details',
        name: 'recipeDetailRoute',
        component: RecipeDetails
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
