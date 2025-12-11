<template>
  <div class="position-relative">
    <div class="form-floating mb-3">
      <input
          v-model="searchTerm"
          @input="handleSearch"
          type="text"
          class="form-control"
          id="ingredient-search-input"
          placeholder="Otsi..."
          autocomplete="off"
      >
      <label for="ingredient-search-input">Otsi koostisosa (min 3 tähte)</label>
    </div>
    <ul v-if="showDropdown && foundIngredients.length" class="list-group position-absolute w-100 shadow start-0" style="z-index: 2000;">
      <li
          v-for="ingredient in foundIngredients"
          :key="ingredient.id"
          @click="selectIngredient(ingredient)"
          class="list-group-item list-group-item-action"
          style="cursor: pointer;"
      >
        {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'IngredientSearch',
  data() {
    return {
      searchTerm: '',
      foundIngredients: [],
      showDropdown: false,
      allIngredients: [],

      ingredient: {
        ingredientId: 0,
        ingredientName: '',
        ingredientMeasureUnitName: ''
      }
    }
  },

  emits: [
    'event-item-selected'
  ],

  methods: {
    handleSearch() {
      if (this.searchTerm.length >= 3) {
        this.foundIngredients = this.allIngredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    },
    selectIngredient(ingredient) {
      this.searchTerm = ingredient.name;
      this.ingredient = ingredient;
      this.showDropdown = false;
      this.$emit('event-item-selected', ingredient);
    },
  },

  beforeMount() {
    SearchService.sendGetIngredientRequest()
        .then(response => this.allIngredients = response.data)
        .catch(() => NavigationService.navigateToErrorView() )
  }
}
</script>