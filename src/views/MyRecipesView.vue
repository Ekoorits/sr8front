<template>
  <div>
    <h1 class="mb-4">Minu retseptid</h1>

    <RecipesSearch
        @event-search-text-changed="onSearchTextChanged"
    />

    <div class="mt-4" v-if="recipes.length > 0">
      <RecipeCards :recipes="recipes" />
    </div>

    <div v-else class="mt-4">
      <p>Sul ei ole veel ühtegi retsepti.</p>
    </div>
  </div>
</template>

<script>
import RecipesSearch from "@/components/recipe/RecipesSearch.vue";
import RecipeCards from "@/components/recipe/RecipeCards.vue";
import RecipeService from "@/services/RecipeService";
import SessionStorageService from "@/services/SessionStorageService";

export default {
  name: "MyRecipesView",
  components: { RecipeCards, RecipesSearch },

  data() {
    return {
      allRecipes: [],
      recipes: [],
    };
  },

  methods: {
    onSearchTextChanged(searchText) {
      const term = (searchText || "").toLowerCase().trim();

      if (!term) {
        this.recipes = this.allRecipes;
        return;
      }

      this.recipes = this.allRecipes.filter((r) => {
        const name = (r.name || "").toLowerCase();
        const author = (r.author || "").toLowerCase();
        return (
            name.includes(term) ||
            author.includes(term)
        );
      });
    },
  },

  mounted() {
    const userId = SessionStorageService.getUserId();
    if (!userId) {
      console.error("Selline userId puudub");
      return;
    }

    RecipeService.sendGetUserRecipes(userId)
        .then((response) => {
          this.allRecipes = response.data.map((r) => ({
            ...r,
            name: r.recipeName,
            imageData: r.recipeImage,
          }));

          this.recipes = this.allRecipes;
        })
        .catch((error) => {
          console.error("Retseptide laadimisel tekkis viga:", error);
        });
  },
};
</script>
