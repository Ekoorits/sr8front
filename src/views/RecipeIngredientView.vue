<template>
  <div class="container text-center">

    <div class="row mt-5 mb-3">
      <div class="col">
        <h1>Lisa koostisosad</h1>
      </div>
    </div>
    <div class="row mt-1 mb-3">
      <div class="col">
        <AlertSuccess :alert-message="successMessage" @event-alert-box-closed="resetMessages"/>
        <AlertDanger :alert-message="errorMessage" @event-alert-box-closed="resetMessages"/>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <IngredientSearch @event-item-selected="setSelectedIngredient"/>
      </div>
      
      <div class="col-2">
        <div class="form-floating mb-3 ">
          <input v-model="ingredientAmount" type="number" min="1" class="form-control" placeholder="Kogus">
          <label>Kogus</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating mb-3 ">
          <SmallButton label="Sisesta" @event-button-is-pressed="executeAddRecipeIngredient()"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <RecipeIngredientTable :recipeIngredients="recipeIngredients" :recipeId="recipeId"
                                  @event-recipe-ingredient-deleted="getRecipeIngredients"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <SmallButton label="Valmis" @event-button-is-pressed="navigateToRecipeView(recipeId)"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SearchService from "@/services/SearchService";
import SmallButton from "@/components/buttons/SmallButton.vue";
import AlertSuccess from "@/components/modal/alerts/AlertSuccess.vue";
import AlertDanger from "@/components/modal/alerts/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import RecipeIngredientService from "@/services/RecipeIngredientService";
import {useRoute} from "vue-router";
import RecipeIngredientTable from "@/components/tables/RecipeIngredientTable.vue";
import IngredientSearch from "@/components/search/IngredientSearch.vue";

export default {
  name: 'recipeIngredientView',
  components: {IngredientSearch, RecipeIngredientTable, AlertDanger, AlertSuccess, SmallButton},
  data() {
    return {

      recipeId: Number(useRoute().query.recipeId),
      ingredientId: 0,
      ingredientAmount: 0,

      errorMessage: '',
      successMessage: '',

      measureUnitName: '',

      recipeIngredients: [
        {
          recipeIngredientId: 0,
          recipeIngredientName: '',
          recipeIngredientAmount: 0,
          recipeIngredientMeasureUnit: '',
          recipeIngredientDescription: ''
        }
      ]

    }
  },
  methods: {

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

    executeAddRecipeIngredient() {
      RecipeIngredientService.sendPostAddRecipeIngredientRequest(this.recipeId, this.ingredientId, this.ingredientAmount)
          .then(() => this.handleAddRecipeIngredientResponse())
          .catch(() => this.handleAddRecipeIngredientResponseError())
    },

    getRecipeIngredients() {
      RecipeIngredientService.sendGetRecipeIngredientsRequest(this.recipeId)
          .then(response => this.recipeIngredients = response.data)
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleAddRecipeIngredientResponse() {
      this.successMessage = "Koostisosa lisatud!";
      setTimeout(this.resetMessages, 4000);
      this.getRecipeIngredients();
    },

    handleAddRecipeIngredientResponseError() {
      this.errorMessage = "Proovi uuesti! Koostisosa lisamine läks nihu.";
      setTimeout(this.resetMessages, 4000);
    },

    setSelectedIngredient(ingredient) {
      this.ingredientId = ingredient.id;
    },

    navigateToRecipeView(recipeId) {
      NavigationService.navigateToRecipeView(recipeId)
    },


  },
  beforeMount() {
    this.getRecipeIngredients()
  }
}
</script>