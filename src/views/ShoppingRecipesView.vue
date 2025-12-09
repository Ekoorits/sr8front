<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Juubeliõhtu söök - shoppingIdga tuleb - </h1>
        <h2>Valitud retseptid ostunimekirjas</h2>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Retsept</h5>
            <p class="card-text">Hristina retsepti kaart</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <SmallButton label="Lisa retsepte" @event-button-is-pressed="navigateToSearch"/>
      </div>
    </div>

  </div>
</template>

<script>
import SmallButton from "@/components/buttons/SmallButton.vue";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'ShoppingRecipesView',
  components: {SmallButton},
  data() {
    return {}
  },
  methods: {

    navigateToSearch() {
      NavigationService.navigateToSearchView();
    }

  },
  mounted() {
  }
}
</script>