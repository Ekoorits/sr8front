<template>
  <div>
    <h1 class="mb-4">Minu retseptid</h1>
    <RecipesSearch/>

    <!-- Display the list of recipes -->
    <div class="mt-4" v-if="recipes.length > 0" >
      <RecipeCards :recipes="recipes"/>
    </div>

    <div v-else class="mt-4">
      <p>Sul ei ole veel ühtegi retsepti.</p>
    </div>
  </div>
</template>

<script>
import RecipesSearch from "@/components/recipe/RecipesSearch.vue";
import RecipeService from "@/services/RecipeService";
import sessionStorageService from "@/services/SessionStorageService";
import RecipeCards from "@/components/recipe/RecipeCards.vue";

export default {
  name: 'MyRecipesView',
  components: {RecipeCards, RecipesSearch},
  data() {
    return {
      recipes: [] // Initialize as an empty array
    }
  },
  mounted() {
    // Fetch recipes when the component is mounted
    const userId = sessionStorageService.getUserId()
    if (!userId) {
      console.error("Selline userId puudub)")
      return;
    }
      RecipeService.sendGetUserRecipes(userId)
          .then(response => {
            this.recipes = response.data.map((r) =>({
              ...r,
              name: r.recipeName,
              imageData: r.recipeImage,
            }));
          })
          .catch((error) => {
            console.error("Retseptide laadimisel tekkis viga:", error);
            // Optionally, show an error message to the user
          });
    },
}
</script>
