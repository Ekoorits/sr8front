import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RecipeDetailsView from "@/views/RecipeDetailsView.vue";
import RecipeIngredientView from "@/views/RecipeIngredientView.vue";
import HomeViewUserLoggedIn from "@/views/HomeViewUserLoggedIn.vue";
import MyRecipesView from "@/views/MyRecipesView.vue";
import RecipeView from "@/views/RecipeView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/home',
        name: 'homeRouteUserLoggedIn',
        component: HomeViewUserLoggedIn
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
        path: '/recipe/:recipeId',
        name: 'recipeRoute',
        component: RecipeView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = sessionStorage.getItem('userId');

    if (to.path === '/' && loggedIn) {
        next('/home');
    } else {
        next();
    }
});

export default router
