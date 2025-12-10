<template>
  <div class="container text-center">

    <div class="row">
      <div class="col">
        <h1>Tee süüa targalt ja keskkonda säästvalt</h1>
      </div>
    </div>
    <div class="row">
      <div class="position-relative">
        <RecipesSearch
            :recipes="recipes"
            :selected-recipe-id="selectedRecipeId"
            @event-recipe-selected="onRecipeSelected"
            @event-search-text-changed="onSearchTextChanged"
        />
      </div>
    </div>
    <div class="row" style="padding:20px">
      <RecipeFilter @filters-changed="onFiltersChanged" />
    </div>
    <div class="row">
      <RecipeCards
          :recipes="recipes"
          @event-add-to-shopping-list="onAddToShoppingList"
      />
    </div>
  </div>
</template>

<script>
import RecipesSearch from '@/components/recipe/RecipesSearch.vue'
import RecipeCards from '@/components/recipe/RecipeCards.vue'
import ShoppingListService from '@/services/ShoppingListService'
import NavigationService from '@/services/NavigationService'
import RecipeFilter from '@/components/recipe/RecipeFilter.vue'
import RecipeService from '@/services/RecipeService'   // используем сервис из курса

export default {
  name: 'SearchView',
  components: { RecipeFilter, RecipesSearch, RecipeCards },

  data () {
    return {
      recipes: [],

      selectedRecipeId: 0,
      recipe: {
        recipeId: 0,
        recipeName: '',
        authorName: '',
        mealType: '',
        difficultyLevelNumber: 0,
        cookingTimeMinutesMax: 0,
        pax: 0,
        instructions: '',
        imageData: ''
      },
      category: {
        name: '',
        description: ''
      },
      searchText: '',
      filters: {
        cookingTimeId: null,
        difficultyId: null,
        mealTypeId: null,
        sort: 'NEWEST'
      },
      errorMessage: '',
      successMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    loadRecipes () {
      RecipeService.sendGetRecipesRequest(
          this.searchText,
          this.filters.cookingTimeId,
          this.filters.difficultyId,
          this.filters.mealTypeId,
          this.filters.sort
      )
          .then(response => {
            this.recipes = response.data
          })
          .catch(() => {})
    },
    onFiltersChanged(newFilters) {
      this.filters = newFilters
      this.loadRecipes()
    },
    onRecipeSelected (recipeId) {
      this.selectedRecipeId = recipeId
      const found = this.recipes.find(r => r.recipeId === recipeId)
      if (found) {
        this.recipe = found
      }
    },
    onSearchTextChanged (searchText) {
      this.searchText = searchText
      this.loadRecipes()
    },
    onAddToShoppingList (recipeId) {
      ShoppingListService.sendAddRecipeToShoppingListRequest(
          recipeId,
          null
      )
          .then(() => {})
          .catch(() => NavigationService.navigateToErrorView())
    }
  },

  mounted () {
    this.loadRecipes()
  }
}
</script>
