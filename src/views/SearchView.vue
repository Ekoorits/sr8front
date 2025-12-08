<template>
  <div class="container text-center">

    <div class="row">
      <div class="col">
        <h1>Tee süüa targalt ja keskkonda säästvalt</h1>
      </div>
    </div>

    <div class="row">
      <div class="position-relative">
        <!-- ВАЖНО: тут передаём МАССИВ recipes и selectedRecipeId -->
        <RecipeList
            :recipes="recipes"
            :selected-recipe-id="selectedRecipeId"
            @event-recipe-selected="onRecipeSelected"
        />
      </div>
    </div>

    <!-- всё, что ниже — твой дизайн фильтров и карточки, я не трогала -->

    <div class="row" style="padding:20px">
      <div class="d-flex align-items-center gap-3 flex-wrap mb-3">

        <span class="fw-semibold">Filtreeri:</span>

        <!-- Kategooria -->
        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            Kategooria
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Magusad</a></li>
            <li><a class="dropdown-item" href="#">Soolased</a></li>
          </ul>
        </div>

        <!-- Raskusaste -->
        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            Raskusaste
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Lihtne</a></li>
            <li><a class="dropdown-item" href="#">Keskmine</a></li>
          </ul>
        </div>

        <!-- Valmistusaeg -->
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

        <!-- All Filters -->
        <div class="dropdown">
          <a class="dropdown-toggle text-decoration-none" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-funnel"></i> Kõik filtrid
          </a>
          <div class="dropdown-menu p-3">
            <p class="mb-1">More filters go here…</p>
          </div>
        </div>

        <span class="mx-2">|</span>

        <!-- Sort -->
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

        <!-- View mode -->
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-list" style="cursor: pointer; font-size: 18px;"></i>
          <i class="bi bi-grid" style="cursor: pointer; font-size: 18px;"></i>
        </div>

      </div>

    </div>

    <div class="row">
      <div class="recipe-card shadow-sm rounded-4 overflow-hidden bg-white" style="width: 260px;">
        <div class="position-relative">
          <img src="IMAGE_URL"
               alt="Retsepti pilt"
               style="width: 100%; height: 160px; object-fit: cover;">
          <div class="position-absolute top-0 end-0 m-2 bg-primary text-white rounded-circle p-2"
               style="cursor:pointer;">
            🛒
          </div>
          <div class="position-absolute bottom-0 end-0 m-2 bg-white rounded-circle p-2 shadow"
               style="cursor:pointer;">
            ⭐
          </div>
        </div>
        <div class="p-3">
          <h5 class="fw-semibold mb-2" style="font-size: 16px;">
            {{ recipe.recipeName || 'Retsepti nimi' }}
          </h5>
          <div class="text-muted" style="font-size: 14px;">
            {{ recipe.cookingTimeMinutesMax || '25' }}min •
            {{ recipe.difficultyLevelNumber || 'Lihtne' }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import RecipeList from "@/components/recipe/RecipeList.vue";

export default {
  name: 'SearchView',
  components: { RecipeList },

  data() {
    return {
      // массив из БД
      recipes: [],

      // id выбранного рецепта (для ребёнка)
      selectedRecipeId: 0,

      // объект выбранного рецепта (для карточки справа/снизу)
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
    // ловим событие от RecipeList
    onRecipeSelected(recipeId) {
      this.selectedRecipeId = recipeId

      // находим рецепт в массиве и кладём в this.recipe
      const found = this.recipes.find(r => r.recipeId === recipeId)
      if (found) {
        this.recipe = found
      }
    }
  },

  mounted() {
    // грузим данные из БД при заходе на страницу
    fetch('/recipes')
        .then(res => res.json())
        .then(data => {
          this.recipes = data
        })
        .catch(err => {
          console.error(err)
          this.errorMessage = 'Viga retseptide laadimisel'
        })
  }
}
</script>
