<template>
  <div class="container text-center">
    <div class="row mt-3">
      <div class="col">
        <h1 class=" align-content-end" >Ostunimekirjad</h1>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <SmallButton label="Loo uus ostunimekiri"/>
      </div>
    </div>

    <div class="row mt-3 justify-content-center">
      <div class="col-auto">
        <div class="card" style="width: 30rem;">
          <div class="card-body">
            <div class="container text-center">
              <div class="row">
                <div class="col">
                  <h2>Juubelisünnipäeva nimekiri 2025</h2>
                  <p>Juubel 100 inimesega <EditButtonIcon/> <DeleteButtonIcon/></p>
                </div>
                <div class="col">
                </div>
                <div class="mb-3">
                  <SmallButton label="Valitud retseptid"/>
                </div>
                <div class="mb-3">
                  <SmallButton label="Vaata ostunimekirja"/>
                </div>
                <div class="mb-3">
                  <SmallButton label="Koosta ostunimekiri"/>
                </div>
                <div class="mb-3">
                  <SmallButton label="Koosta ostunimekiri uuesti"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import SmallButton from "@/components/buttons/SmallButton.vue";
import EditButtonIcon from "@/components/buttons/EditButtonIcon.vue";
import DeleteButtonIcon from "@/components/buttons/DeleteButtonIcon.vue";

export default {
  name: 'ShoppingListsView',
  components: {DeleteButtonIcon, EditButtonIcon, SmallButton},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>