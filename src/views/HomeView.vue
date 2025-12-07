<template>
    <div class="container text-center">

      <div class="row">
        <div class="col">
          <h1>Tee süüa targalt ja keskkonda säästvalt</h1>
        </div>
      </div>

      <div class="row" style="padding:20px">
        <div class="col">
          <p style="font-size: xx-large"> Avasta retseptid, mis hoolivad nii
            sinu tervisest kui ka
            meie planeedist. Lihtsad valikud köögis võivad tuua suuri muutusi igapäevaelus.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-6 ">
          <img src="../assets/images/Logo.png" style="width: 80%; height: auto"
               @click="NavigationService.navigateToSearchView()" class="btn">
        </div>

        <div class="col-6">
          <button @click="NavigationService.navigateToSearchView()" type="button" class="btn btn-primary btn-custom-large">Otsi retsepte</button>
        </div>
      </div>

    </div>
</template>

<script>
import NavigationService from "@/services/NavigationService";

export default {
  name: 'HomeView',
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  data() {
    return {}
  },

  methods: {

  },

  mounted() {

  }
}
</script>