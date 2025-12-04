<template>

  <div class="container text-center">

    <div class="row">
      <div class="col">
        <h1>Tee süüa targalt ja keskkonda säästvalt</h1>
      </div>
    </div>

    <div class="row" style="padding:20px">
      <div class="col">
        <p style="font-size: xx-large">Tee süüa targalt ja keskkonda säästvalt – avasta retseptid, mis hoolivad nii sinu tervisest kui ka
          meie planeedist. Lihtsad valikud köögis võivad tuua suuri muutusi igapäevaelus.</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button @click="toSearch" type="button" class="btn btn-primary btn-lg">Otsi retsepte</button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {}
  },

  methods: {
    toSearch() {
      this.$router.push({name: 'search'});
    }
  },

  mounted() {
  }
}
</script>