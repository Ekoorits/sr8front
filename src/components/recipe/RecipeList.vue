<template>
  <div>
    <!-- строка поиска -->
    <div class="position-relative mb-3">
      <i class="bi bi-search position-absolute"
         style="left: 10px; top: 50%; transform: translateY(-50%);"></i>

      <input
          v-model="searchText"
          @keyup.enter="searchRecipes" type="text" class="form-control ps-5 rounded-pill" placeholder="Otsi retsepti..." >
    </div>

    <!-- список найденных рецептов -->
    <ul class="list-group">
      <li v-for="recipe in recipes"
          :key="recipe.id"
          class="list-group-item list-group-item-action"
          @click="selectRecipe(recipe.id)">
        {{ recipe.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RecipeList',

  data () {
    return {
      searchText: '',
      recipes: []
    }
  },

  methods: {
    searchRecipes () {
      axios.get('http://localhost:8080/recipes/search', {
        params: {
          name: this.searchText   // <-- то, что вводит пользователь
        }
      })
          .then(response => {
            this.recipes = response.data
          })
          .catch(error => {
            console.error('Viga retseptide otsimisel', error)
          })
    },

    selectRecipe (selectedRecipeId) {
      this.$emit('event-recipe-selected', Number(selectedRecipeId))
    }
  },

  mounted () {
    // при первом открытии можно загрузить все рецепты
    this.searchRecipes()
  }
}
</script>
