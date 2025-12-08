<template>

  <div class="row">
    <div class="col">
      <h1>Minu retseptid</h1>
    </div>
  </div>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
      <div class="col justify-content-center" >
        <div class="form-floating mb-4" >
          <input v-model="username" type="text" class="form-control">
          <label>Otsing</label>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
export default {
  name: 'MyRecipesView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>