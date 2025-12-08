import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RecipeDetailsView from "@/views/RecipeDetailsView.vue";
import AddIngredientView from "@/views/AddIngredientView.vue";
import HomeViewUserLoggedIn from "@/views/HomeViewUserLoggedIn.vue";

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
        component: AddIngredientView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
//Minu jaoks segane koht. Kas ei peaks olema mujal?
router.beforeEach((to, from, next) => {
    const loggedIn = sessionStorage.getItem('userId');

    if (to.path === '/' && loggedIn) {
        next('/home');
    } else {
        next();
    }
});

export default router
