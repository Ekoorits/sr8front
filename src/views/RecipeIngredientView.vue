<template>
  <div class="container text-center">

    <div class="row mt-5 mb-3">
      <div class="col">
        <h1>Lisa koostisosad</h1>
      </div>
    </div>
    <div class="row mt-1 mb-3">
      <div class="col">
        <AlertSuccess :alert-message="this.successMessage" @event-alert-box-closed="resetMessages" />
        <AlertDanger :alert-message="this.errorMessage" @event-alert-box-closed="resetMessages"/>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <div class="form-floating mb-3">
          <input v-model="searchParam" type="text" class="form-control" placeholder="Koostisosa">
          <label>Koostisosa (vahet Hristina SEARCH componendi vastu)</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating mb-3 ">
          <input v-model="newRecipeIngredient.amount" type="number" min="1" class="form-control" placeholder="Kogus">
          <label>Kogus {{this.convertMeasureUnitToName(this.newRecipeIngredient.measureUnit)}}</label>
        </div>
      </div>
      <div class="col-2">
        <div class="form-floating mb-3 ">
          <SmallButton label="Sisesta" @event-button-is-pressed="executeAddRecipeIngredient()"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Koostisosa</th>
              <th scope="col">Kogus</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Piim</td>
              <td>300 ml</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Muna</td>
              <td>5000 g</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <SmallButton label="Valmis" @event-button-is-pressed="navigateToRecipeView"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SearchService from "@/services/SearchService";
import SmallButton from "@/components/buttons/SmallButton.vue";
import NewRecipeIngredientService from "@/services/NewRecipeIngredientService";
import AlertSuccess from "@/components/modal/alerts/AlertSuccess.vue";
import AlertDanger from "@/components/modal/alerts/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'recipeIngredientView',
  components: {AlertDanger, AlertSuccess, SmallButton},
  data() {
    return {

      errorMessage: '',
      successMessage: '',

      searchParam: '',
      measureUnitName: '',

      newRecipeIngredient: {
        name: '',
        amount: 0,
        measureUnit: ''
      },
    }
  },
  methods: {

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

    executeAddRecipeIngredient() {
      NewRecipeIngredientService.sendPostAddRecipeIngredientRequest(this.newRecipeIngredient)
          .then(() => this.handleAddRecipeIngredientResponse())
          .catch(() => this.handleAddRecipeIngredientResponseError())
    },

    handleAddRecipeIngredientResponse() {
      this.successMessage = "Koostisosa lisatud!";
      setTimeout(this.resetMessages, 4000);
    },

    handleAddRecipeIngredientResponseError() {
      this.errorMessage = "Proovi uuesti! Koostisosa lisamine läks nihu.";
      setTimeout(this.resetMessages, 4000);
    },

    searchIngredients() {
      if(this.searchParam.length >= 3) {
        SearchService.sendGetRecipeIngredientRequest(this.searchParam)
            .then(response => {})
      }
    },

    convertMeasureUnitToName(measureUnit) {
      if(measureUnit === 'g') {
        return this.measureUnitName = 'grammides'
      } else if (measureUnit === 'ml') {
        return this.measureUnitName = 'milliliitrites'
      } else {
        return this.measureUnitName = ''
      }
    },

    navigateToRecipeView(recipeId) {
      NavigationService.navigateToRecipeView(recipeId)
    },


  },
  mounted() {
  }
}
</script>