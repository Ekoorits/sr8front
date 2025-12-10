<template>

  <div class="container text-center">

    <div class="row mt-5 mb-3">
      <div class="col">
        <h1>Uue retsepti lisamine</h1>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col">
        <h1>{{ this.newRecipe.recipeName }}</h1>
      </div>
    </div>

    <div class="row">

      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="newRecipe.recipeName" type="text" class="form-control" placeholder="Kasutajanimi">
          <label>Retsepti nimi</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="newRecipe.authorName" type="text" class="form-control" placeholder="Kasutajanimi">
          <label>Retsepti looja nimi</label>
        </div>
        <div class="form-floating mb-3">
          <ImageInput @event-new-image-selected="handleNewImageSelected"
                      @event-chosen-image-cleared="handleImageCleared"
          />
        </div>
        <div class="form-group mb-3">
          <label for="exampleFormControlTextarea1">Valmistamisjuhend</label>
          <textarea v-model="newRecipe.instructions" class="form-control" rows="5"></textarea>
        </div>
      </div>

      <div class="col">

        <div class="form-floating mb-3">
          <input v-model="newRecipe.pax" type="number" min="1" class="form-control" placeholder="Kasutajanimi">
          <label>Sööjate arv</label>
        </div>

        <MealTypeDropdown class="form-floating mb-3"
                          :mealTypes="mealTypes"
                          :selected-meal-type="newRecipe.mealType"
                          @event-new-meal-type-selected="handleNewMealTypeSelected"/>
        <DifficultiesDropdown class="form-floating mb-3"
                              :difficulties="difficulties"
                              :selected-difficulty-level-number="newRecipe.difficultyLevelNumber"
                              @event-new-difficulty-selected="handleNewDifficultySelected"/>
        <CookingTimeDropdown class="form-floating mb-3"
                             :cookingTimes="cookingTimes"
                             :selected-cooking-time-id="newRecipe.cookingTimeMinutesMax"
                             @event-new-cooking-time-selected="handleNewCookingTimeSelected"/>

      </div>

    </div>


    <div class="row mt-5 mb-3">
      <div class="col">
        <LargeButton @event-button-is-pressed="returnToHomeScreen" label="Tühista"/>
      </div>
      <div class="col">
        <LargeButton @event-button-is-pressed="executeAddNewRecipe" label="Salvesta"/>
      </div>
    </div>


  </div>
</template>

<script>
import DifficultiesDropdown from "@/components/dropdowns/DifficultiesDropdown.vue";
import MealTypeDropdown from "@/components/dropdowns/MealTypeDropdown.vue";
import CookingTimeDropdown from "@/components/dropdowns/CookingTimeDropdown.vue";
import MealTypeService from "@/services/MealTypeService";
import DifficultyService from "@/services/DifficultyService";
import NavigationService from "@/services/NavigationService";
import CookingTimeService from "@/services/CookingTimeService";
import LargeButton from "@/components/buttons/LargeButton.vue";
import ImageInput from "@/components/image/ImageInput.vue";
import RecipeService from "@/services/RecipeService";

export default {
  name: 'RecipeDetails',
  components: {ImageInput, LargeButton, CookingTimeDropdown, MealTypeDropdown, DifficultiesDropdown},
  data() {
    return {

      mealTypes: [
        {
          mealTypeId: 0,
          mealTypeName: ''
        }
      ],

      difficulties: [
        {
          difficultyLevelName: '',
          difficultyLevelNumber: 0
        }
      ],

      cookingTimes: [
        {
          cookingTimeMinutesMax: 0
        }
      ],


      newRecipe: {
        recipeName: '',
        authorName: '',
        mealType: '',
        difficultyLevelNumber: 0,
        cookingTimeMinutesMax: 0,
        pax: 0,
        instructions: '',
        imageData: ''
      }

    }
  },
  methods: {

    executeAddNewRecipe() {
    RecipeService.sendPostRecipeDetailRequest(this.newRecipe)
        .then(response => this.handleAddNewRecipeResponse(response))
        .catch(() => NavigationService.navigateToErrorView())
    },

    handleAddNewRecipeResponse(response) {
      let recipeId = response.data
      NavigationService.navigateToAddIngredientView(recipeId)
    },

    returnToHomeScreen() {
      NavigationService.navigateToHomeView()
    },

    handleNewMealTypeSelected(selectedMealTypeName) {
      this.newRecipe.mealType = selectedMealTypeName
    },

    handleNewDifficultySelected(selectedDifficultyLevelNumber) {
      this.newRecipe.difficultyLevelNumber = selectedDifficultyLevelNumber
    },

    handleNewCookingTimeSelected(selectedCookingTimeMinutesMax) {
      this.newRecipe.cookingTimeMinutesMax = selectedCookingTimeMinutesMax
    },

    handleNewImageSelected(imageData) {
      this.newRecipe.imageData = imageData
    },

    handleImageCleared() {
      this.newRecipe.imageData = ''
    },

    getMealTypes() {
      MealTypeService.sendGetMealTypesRequest()
          .then(response => this.mealTypes = response.data)
          .catch(() => NavigationService.navigateToErrorView());
    },

    getDifficulties() {
      DifficultyService.sendGetDifficultiesRequest()
          .then(response => this.difficulties = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    getCookingTime() {
      CookingTimeService.sendGetCookingTimeRequest()
          .then(response => this.cookingTimes = response.data)
          .catch(() => NavigationService.navigateToErrorView());
    },

  },

  beforeMount() {
    this.getMealTypes()
    this.getDifficulties()
    this.getCookingTime()
  }
}
</script>