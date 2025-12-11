<template>
  <table v-if="recipeIngredients.length > 0" class="table table-striped">
    <thead>
    <tr>
      <th scope="col">Koostisosa</th>
      <th scope="col">Kogus</th>
      <th scope="col">Ühik</th>
      <th scope="col" v-if="isLoggedIn"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient.recipeIngredientId">
      <td>{{recipeIngredient.recipeIngredientName}}</td>
      <td>{{recipeIngredient.recipeIngredientAmount}}</td>
      <td>{{recipeIngredient.recipeIngredientMeasureUnit}}</td>
      <td>{{recipeIngredient.recipeIngredientDescription}}</td>
      <td v-if="isLoggedIn">
        <DeleteButtonIcon @event-button-is-pressed="handleDeleteRecipeIngredient(recipeIngredient.recipeIngredientId)"
                          kuidagi peab emittimia.
        />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import SessionStorageService from "@/services/SessionStorageService";
import DeleteButtonIcon from "@/components/buttons/DeleteButtonIcon.vue";
import RecipeIngredientService from "@/services/RecipeIngredientService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'RecipeIngredientTable',
  components: {DeleteButtonIcon},
  props: {
    recipeIngredients: Array,
    recipeId: Number
  },
  data() {
    return {
      isLoggedIn: false,

      recipeIngredient: {
        recipeIngredientId: 0,
        recipeIngredientName: '',
        recipeIngredientAmount: 0,
        recipeIngredientMeasureUnit: '',
        recipeIngredientDescription: ''
      }
    }
  },
  methods: {

    handleDeleteRecipeIngredient(recipeIngredientId) {
      RecipeIngredientService.sendDeleteRecipeIngredientRequest(recipeIngredientId)
    },
  },

  beforeMount() {
    this.isLoggedIn = SessionStorageService.isLoggedIn()
  },
}
</script>