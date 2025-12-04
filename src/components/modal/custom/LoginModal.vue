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
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LoginModal',
  components: {Modal},
  props: {
    loginModalIsOpen: Boolean
  }
}
</script>