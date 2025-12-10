import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RecipeDetailsView from "@/views/RecipeDetailsView.vue";
import RecipeIngredientView from "@/views/RecipeIngredientView.vue";
import MyRecipesView from "@/views/MyRecipesView.vue";
import RecipeView from "@/views/RecipeView.vue";
import ShoppingListsView from "@/views/ShoppingListsView.vue";
import ShoppingListView from "@/views/ShoppingListView.vue";
import ShoppingRecipesView from "@/views/ShoppingRecipesView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/my-recipes',
        name: 'myRecipesRoute',
        component: MyRecipesView
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
    },
    {
        path: '/recipe',
        name: 'recipeRoute',
        component: RecipeView
    },
    {
        path: '/shopping-lists',
        name: 'shoppingListsRoute',
        component: ShoppingListsView
    },
    {
        path: '/shopping-list',
        name: 'shoppingListRoute',
        component: ShoppingListView
    },
    {
        path: '/shopping-recipes',
        name: 'shoppingRecipesRoute',
        component: ShoppingRecipesView
    },
    {
        path: '/recipes/id',
        name: 'recipeView',
        component: RecipeView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
