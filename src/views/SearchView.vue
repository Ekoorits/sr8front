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
import RecipeService from '@/services/RecipeService'

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
        cookingTimeId: 0,
        difficultyId: 0,
        mealTypeId: 0,
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
    getRecipeId (recipe) {
      if (recipe.recipeId != null) {
        return recipe.recipeId
      }
      if (recipe.id != null) {
        return recipe.id
      }
      return 0
    },

    loadRecipes () {
      console.log('loadRecipes filters:', this.filters)
      // let hasFilters =
      //     this.filters.mealTypeId != null ||
      //     this.filters.difficultyId != null ||
      //     this.filters.cookingTimeId != null
      //
      // if (hasFilters) {
        alert( "mealTypeId: " + this.filters.mealTypeId + "difficultyId: " + this.filters.difficultyId + "cookingTimeId: " +  this.filters.cookingTimeId)
        RecipeService.sendGetFilteredRecipesRequest(
            this.filters.mealTypeId,
            this.filters.difficultyId,
            this.filters.cookingTimeId
        )
            .then((response) => {
              this.recipes = response.data
              this.applySort()
            })
            .catch(() => {})

    },

    // сортировка по id на фронте
    applySort () {
      if (!this.recipes || this.recipes.length === 0) {
        return
      }

      let sortValue = this.filters.sort || 'NEWEST'

      this.recipes.sort((a, b) => {
        let idA = this.getRecipeId(a)
        let idB = this.getRecipeId(b)

        if (sortValue === 'NEWEST') {
          return idB - idA
        } else {
          return idA - idB
        }
      })

      console.log('sorted', sortValue, this.recipes.map(r => this.getRecipeId(r)))
    },

    onFiltersChanged (newFilters) {
      this.filters = newFilters
      this.loadRecipes()
    },

    onRecipeSelected (recipeId) {
      this.selectedRecipeId = recipeId

      let selectedRecipe = this.recipes.find(function (recipe) {
        return recipe.recipeId === recipeId || recipe.id === recipeId
      })

      if (selectedRecipe) {
        this.recipe = selectedRecipe
      }

      NavigationService.navigateToRecipeView(recipeId)
    },

    onSearchTextChanged (searchText) {
      this.searchText = searchText

      RecipeService.sendGetRecipesRequest(this.searchText)
          .then((response) => {
            this.recipes = response.data
            this.applySort()
          })
          .catch(() => {})
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

