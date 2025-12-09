<template>
  <div class="row g-4">
    <div
        v-for="recipe in recipes"
        :key="recipe.recipeId"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <div class="recipe-card shadow-sm rounded-4 overflow-hidden bg-white" style="width: 260px; margin: auto;">
        <div class="position-relative">

          <!-- КАРТИНКА РЕЦЕПТА -->
          <img
              :src="getImageSrc(recipe)"
              alt="Retsepti pilt"
              style="width: 100%; height: 160px; object-fit: cover;"
          >

          <div
              class="position-absolute top-0 end-0 m-2 bg-primary text-white rounded-circle p-2"
              style="cursor:pointer;"
          >
            🛒
          </div>
          <div
              class="position-absolute bottom-0 end-0 m-2 bg-white rounded-circle p-2 shadow"
              style="cursor:pointer;"
          >
            ⭐
          </div>
        </div>

        <div class="p-3">
          <h5 class="fw-semibold mb-2" style="font-size: 16px;">
            {{ recipe.recipeName }}
          </h5>
          <div class="text-muted" style="font-size: 14px;">
            {{ recipe.cookingTimeMinutesMax || 'min' }}min •
            {{ recipe.difficultyLevelNumber || '' }}
          </div>
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
    getImageSrc(recipe) {
      // если backend отдаёт base64 в поле imageData
      if (recipe.imageData) {
        return 'data:image/jpeg;base64,' + recipe.imageData
      }
      // запасная картинка, пока нет фото из БД
      return 'IMAGE_URL'
      // сюда можешь поставить свой путь, например: '/img/placeholder.jpg'
    }
  }
}
</script>
