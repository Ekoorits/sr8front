<template>
  <div class="recipe-page">

    <!-- Pealkiri -->
    <section class="text-center mb-4">
      <div class="container text-center">
        <h1 class="mb-2">{{ recipe.name }}</h1>
        <h3 class="mb-4">Inimeste arv: {{ recipe.pax }}</h3>
      </div>
    </section>

    <!-- Pilt -->
    <section class="text-center mb-5">
      <div class="container">
        <img :src="recipe.imageUrl" :alt="recipe.name" class="img-fluid rounded shadow mb-4"/>
      </div>
    </section>

    <!-- Koostisosade tabel -->
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
                <td>{{ ingredient.name }}</td>
                <td>{{ ingredient.amount }}</td>
                <td>{{ ingredient.measureUnit }}</td>
              </tr>
              </tbody>
            </table>
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

  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService";

export default {
  name: 'RecipeView',
  data() {
    return {
      recipe: {
          userId: 0,
          mealTypeId: 0,
          cookingTimeId: 0,
          difficultyId: 0,
          name: '',
          author: '',
          pax: 0,
          instructions: '',
      },
      recipeImage: {
        imageData: '',
      },
      ingredients: []
    }

  },
  methods() {


  }
  }
</script>

