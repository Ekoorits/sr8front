<template>
  <Modal :modal-is-open="loginModalIsOpen">
    <template #title>
      Sisselogimine
    </template>

    <template #body>
      <div class="form-floating mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Kasutajanimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Parool">
        <label>Parool</label>
      </div>
      <div class="form-floating mb-3">
        <p style="text-align: left">Kui sul pole veel kasutajat
          <button @click="$emit('event-open-new-user-modal'); $emit('event-close-login-modal')" type="submit" class="btn btn-outline-success ms-2">Loo uus konto</button>
        </p>

      </div>
    </template>

    <template #buttons>
      <button @click="$emit('event-close-login-modal')" type="submit" class="btn btn-outline-secondary me-3">Sulge</button>
      <button @click="$emit('event-log-in-executed')" type="submit" class="btn btn-outline-success">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";

export default {
  name: 'LoginModal',
  components: {NewUserModal, Modal},
  props: {
    loginModalIsOpen: Boolean,
    newUserModalIsOpen: Boolean
  },

  methods:{
    closeNewUserModal(){
      this.newUserModalIsOpen=false
    },
  },

  emits: [
      'event-close-login-modal',
      'event-open-new-user-modal'
  ]
}
</script>