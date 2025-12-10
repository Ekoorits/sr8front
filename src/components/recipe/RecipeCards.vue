<template>
  <div class="row g-4">
    <div
        v-for="recipe in recipes"
        :key="recipe.recipeId"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <div class="recipe-card shadow-sm rounded-4 overflow-hidden bg-white" style="width: 260px; margin: auto;">
        <div class="position-relative">

          <!-- 🔗 КАРТИНКА КЛИКАБЕЛЬНАЯ -->
          <router-link
              :to="{
              name: 'recipeRoute',
              query: { recipeId: recipe.recipeId }
            }"
          >
            <img v-if="recipe.imageData !== ''"
                 :src="recipe.imageData"
                 alt="Retsepti pilt"
                 style="width: 100%; height: 160px; object-fit: cover; cursor:pointer;"
            >
            <img v-else
                 src="../../assets/logo.png"
                 alt="Retsepti pilt"
                 style="width: 100%; height: 160px; object-fit: cover; cursor:pointer;"
            >
          </router-link>
          <div   class="position-absolute top-0 end-0 m-2 bg-primary text-white rounded-circle p-2"
                 style="cursor:pointer;"
                 @click.stop="addToShoppingList(recipe.recipeId)"
          >
            🛒
          </div>
        </div>

        <div class="p-3">
          <router-link
              :to="{
              name: 'recipeDetailsRoute',
              query: { recipeId: recipe.recipeId }
            }"
              class="text-decoration-none text-dark"
              style="cursor:pointer;"
          >
            <h5 class="fw-semibold mb-2" style="font-size: 16px;">
              {{ recipe.name }}
            </h5>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeCards',
  props: {
    recipes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addToShoppingList(recipeId) {
      this.$emit(
          'event-add-to-shopping-list',
          String(recipeId)
      )
    }
  }
  }
</script>

