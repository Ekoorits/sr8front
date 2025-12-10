<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>WIP Ostunimekiri</h1>
      </div>
    </div>
    <div class="row">

      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="this.newShoppingListEntry.name" type="text" class="form-control" placeholder="Toote nimi">
          <label>Toote nimi</label>
        </div>
      </div>

      <div class="col-2">
        <div class="form-floating mb-3 ">
          <input v-model="this.newShoppingListEntry.amount" type="number" min="1" class="form-control" placeholder="Kogus">
          <label>Kogus</label>
        </div>
      </div>

      <div class="col-2">
        <div class="form-floating mb-3 ">
          <select class="form-select">
            <option selected disabled>Kategooria</option>

          </select>
        </div>
      </div>

      <div class="col-2">
        <div class="form-floating mb-3 ">
          <SmallButton class="justify-content-center" label="Sisesta &#8595;" @event-button-is-pressed="executeAddShoppingListItem()"/>
        </div>
      </div>

    </div>

    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Kategooria nimi läheb siia</th>
            <th scope="col">Kogus läheb siia</th>
            <th scope="col">Ühik läheb siia</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Piim</td>
            <td>1000</td>
            <td>ml</td>
            <td>
              <EditButtonIcon/>
              <DeleteButtonIcon/>
            </td>
          </tr>
          <tr>
            <td>Jahu</td>
            <td>2555</td>
            <td>g</td>
            <td>
              <EditButtonIcon/>
              <DeleteButtonIcon/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>

<script>
import EditButtonIcon from "@/components/buttons/EditButtonIcon.vue";
import DeleteButtonIcon from "@/components/buttons/DeleteButtonIcon.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";

export default {
  name: 'ShoppingListView',
  components: {SmallButton, DeleteButtonIcon, EditButtonIcon},
  data() {
    return {

      newShoppingListEntry: {
        name: '',
        amount: 0,
      }

    }
  },
  methods: {

    executeAddShoppingListItem() {

    },
  },
  mounted() {
  }
}
</script>