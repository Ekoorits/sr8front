<template>
  <div class="recipe-page">

    <!-- Pealkiri -->
    <section class="text-center mb-4">
      <div class="container text-center">
        <h1 class="mb-2">{{ recipe.recipeName }}</h1>
        <h3 class="mb-4">Inimeste arv: {{ recipe.pax }}</h3>
      </div>
    </section>

    <!-- Pilt -->
    <section class="text-center mb-5" v-if="recipe.imageUrl">
      <div class="container">
        <img
            :src="recipe.imageUrl"
            :alt="recipe.recipeName"
            class="img-fluid rounded shadow mb-4"
        />
      </div>
    </section>

    <section class="text-center mb-5" v-else>
      <p class="text-muted">Pilt puudub</p>
    </section>

    <!-- Koostisosad -->
    <section class="mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <RecipeIngredients :ingredients="recipe.ingredients" />
          </div>
        </div>
      </div>
    </section>

    <!-- Juhend -->
    <section class="mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <h4 class="mb-3 text-start">Valmistamine:</h4>
            <p style="white-space: pre-wrap;">{{ recipe.instructions }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Laadimine / viga -->
    <section class="mb-5" v-if="isLoading || loadError">
      <div class="container text-center">
        <p v-if="isLoading">Laen retsepti...</p>
        <p v-if="loadError" class="text-danger">{{ loadError }}</p>
      </div>
    </section>

  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService"
import RecipeIngredients from "@/components/recipe/RecipeIngredients.vue"

export default {
  name: "RecipeView",

  components: {
    RecipeIngredients
  },

  data () {
    return {
      recipe: {
        recipeId: 0,
        recipeName: "",
        authorName: "",
        mealType: "",
        difficultyLevelNumber: 0,
        cookingTimeMinutesMax: 0,
        pax: 0,
        instructions: "",
        imageData: "",
        imageUrl: "",
        ingredients: []
      },
      isLoading: false,
      loadError: null
    }
  },

  mounted () {
    let recipeId = this.$route.query.recipeId

    if (!recipeId) {
      this.loadError = "Retsepti ID puudub"
      return
    }

    this.loadRecipe(recipeId)
  },

  methods: {
    loadRecipe (id) {
      this.isLoading = true
      this.loadError = null

      RecipeService.getRecipe(id)
          .then(response => {
            let data = response.data
            this.recipe = Object.assign({}, this.recipe, data)
            if (data.imageData) {
              this.recipe.imageUrl = "data:image/jpeg;base64," + data.imageData
            }
            if (data.ingredients) {
              this.recipe.ingredients = data.ingredients
            }
          })
          .catch(() => {
            this.loadError = "Retsepti ei saanud laadida"
          })
          .finally(() => {
            this.isLoading = false
          })
    }
  }
}
</script>
