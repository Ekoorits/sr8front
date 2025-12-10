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

    <!-- Фильтры -->
    <div class="row" style="padding:20px">
      <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
        <span class="fw-semibold">Filtreeri:</span>

        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            Kategooria
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Magusad</a></li>
            <li><a class="dropdown-item" href="#">Soolased</a></li>
          </ul>
        </div>

        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            Raskusaste
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Lihtne</a></li>
            <li><a class="dropdown-item" href="#">Keskmine</a></li>
          </ul>
        </div>

        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            Valmistusaeg
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">10 min</a></li>
            <li><a class="dropdown-item" href="#">20 min</a></li>
            <li><a class="dropdown-item" href="#">30+ min</a></li>
          </ul>
        </div>

        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-funnel"></i> Kõik filtrid
          </a>
          <div class="dropdown-menu p-3">
            <p class="mb-1">More filters go here…</p>
          </div>
        </div>

        <span class="mx-2">|</span>

        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            ↓↑ Sort: Uuemad
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Uuemad</a></li>
            <li><a class="dropdown-item" href="#">Vanemad</a></li>
            <li><a class="dropdown-item" href="#">Popilaarsemad</a></li>
          </ul>
        </div>

        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-list" style="cursor: pointer; font-size: 18px;"></i>
          <i class="bi bi-grid" style="cursor: pointer; font-size: 18px;"></i>
        </div>
      </div>
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
import RecipeService from '@/services/RecipeService'
import ShoppingListService from '@/services/ShoppingListService'
import NavigationService from '@/services/NavigationService'

export default {
  name: 'SearchView',
  components: { RecipesSearch, RecipeCards },

  data () {
    return {
      recipes: [
        {
          recipeId: 0,
          name: '',
          pax: 0,
          author: '',
          imageData: ''
        }
      ],

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

      errorMessage: '',
      successMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {
    onRecipeSelected (recipeId) {
      this.selectedRecipeId = recipeId
      const found = this.recipes.find(r => r.recipeId === recipeId)
      if (found) {
        this.recipe = found
      }
    },

    onSearchTextChanged (searchText) {
      RecipeService.sendGetRecipesRequest(searchText)
          .then(response => this.recipes = response.data)
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
    this.onSearchTextChanged('')
  }
}
</script>
