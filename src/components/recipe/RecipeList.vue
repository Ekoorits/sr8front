<template>
  <div>
    <!-- строка поиска -->
    <div class="position-relative mb-3">
      <i class="bi bi-search position-absolute"
         style="left: 10px; top: 50%; transform: translateY(-50%);"></i>

      <input
          v-model="searchText"
          type="text"
          class="form-control ps-5 rounded-pill"
          placeholder="Otsi retsepti..."
      >
    </div>

    <!-- список найденных рецептов -->
    <ul class="list-group">
      <li
          v-for="recipe in filteredRecipes"
          :key="recipe.recipeId"
          class="list-group-item list-group-item-action"
          @click="selectRecipe(recipe.recipeId)"
      >
        {{ recipe.recipeName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecipeList',

  props: {
    // массив рецептов из родителя
    recipes: {
      type: Array,
      default: () => []
    },
    // id выбранного рецепта (если нужно подсвечивать)
    selectedRecipeId: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      searchText: ''
    }
  },

  computed: {
    filteredRecipes () {
      const text = this.searchText.toLowerCase().trim()
      if (!text) {
        return this.recipes
      }
      return this.recipes.filter(r =>
          String(r.recipeName).toLowerCase().includes(text)
      )
    }
  },

  methods: {
    selectRecipe (selectedRecipeId) {
      this.$emit('event-recipe-selected', Number(selectedRecipeId))
    }
  }
}
</script>
