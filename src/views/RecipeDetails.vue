<template>

  <div class="container text-center">

    <div class="row mt-5 mb-5">
      <div class="col">
        <h1>Retsepti Nimi läheb Siia.</h1>
      </div>
    </div>

    <div class="row">

      <div class="col">

        <div class="form-floating mb-3">
          <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
          <label>Retsepti nimi</label>
        </div>

      </div>

      <div class="col">

        <DifficultiesDropdown :difficulties="difficulties"/>

      </div>

    </div>

  </div>
</template>

<script>
import DifficultiesDropdown from "@/components/DifficultiesDropdown.vue";

export default {
  name: 'RecipeDetails',
  components: {DifficultiesDropdown},
  data() {
    return {

      difficulties:
      [
        {
          difficultyId: 0,
          difficultyLevelName: ''
        }
      ],

    }
  },
  methods: {},
  mounted() {
  }
}
</script>