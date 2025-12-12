<template>
  <div class="recipe-page">

    <section class="text-center mb-4">
      <div class="container text-center">
        <h1 class="mb-2">{{ recipe.name }}</h1>
        <h3 class="mb-4">Inimeste arv: {{ recipe.pax }}</h3>
      </div>
    </section>

    <section class="text-center mb-5">
      <div class="container">
        <img :src="recipe.imageUrl" :alt="recipe.name" class="img-fluid rounded shadow mb-4"/>
      </div>
    </section>

    <section class="mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <h4 class="mb-3 text-start">Koostisosad:</h4>
            <table class="table table-bordered">
              <thead>
              <tr>
                <th scope="col">koostisosa</th>
                <th scope="col">kogus</th>
                <th scope="col">ühik</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                <td>{{ ingredient.recipeIngredientName }}</td>
                <td>{{ ingredient.recipeIngredientAmount }}</td>
                <td>{{ ingredient.recipeIngredientMeasureUnit }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

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

  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService";
import {useRoute} from "vue-router";

export default {
  name: "RecipeView",

  data() {
    return {
      
      recipe: {
        id: 0,
        userId: 0,
        mealTypeId: 0,
        cookingTimeId: 0,
        difficultyId: 0,
        name: "",
        author: "",
        pax: 0,
        instructions: "",
        imageUrl: "",
        ingredients: [],
      },
    };
  },

  mounted() {
    this.loadRecipe();
  },

  methods: {
    loadRecipe() {
      const recipeId = Number(useRoute().query.recipeId);
      if (!recipeId) {
        console.error("Route param 'id' puudub");
        return;
      }

      RecipeService.getRecipe(recipeId)
          .then((response) => {
            const r = response.data;

            this.recipe = {
              ...this.recipe,
              id: r.recipeId,
              name: r.name,
              pax: r.pax,
              author: r.author,
              imageUrl: r.imageData
                  ? "data:image/jpeg;base64," + r.imageData
                  : "",
              instructions: r.instructions || "",
            };

            return RecipeService.getRecipeIngredients(recipeId);
          })
          .then(ingredientsResponse => {
            this.recipe.ingredients = ingredientsResponse.data || [];
          })
          .catch((error) => {
            console.error("Retsepti laadimisel tekkis viga:", error);
          });
    },
  },
};
</script>
