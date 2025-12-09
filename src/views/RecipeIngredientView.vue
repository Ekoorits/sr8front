<template>
  <div class="container text-center">

    <div class="row mt-5 mb-3">
      <div class="col">
        <h1>Lisa koostisosad</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="searchParam" type="text" class="form-control" placeholder="Koostisosa">
          <label>Koostisosa</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="newRecipeIngredient.amount" type="number" min="1" class="form-control" placeholder="Kogus">
          <label>Kogus</label>
        </div>
      </div>
      <div class="col ">
        Column 3
      </div>
    </div>

  </div>
</template>

<script>
import SearchService from "@/services/SearchService";

export default {
  name: 'recipeIngredientView',
  data() {
    return {

      searchParam: '',

      newRecipeIngredient: {
        amount: 0,
      }

    }
  },
  methods: {

    searchIngredients() {
      if(this.searchParam.length >= 3) {
        SearchService.sendGetRecipeIngredientRequest(this.searchParam)
            .then(response => {})
      }
    },

  },
  mounted() {
  }
}
</script>