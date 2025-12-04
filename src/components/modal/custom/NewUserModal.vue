<template>
  <Modal :modal-is-open="newUserModalIsOpen">

    <template #title>
      Loo uus kasutaja
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
        <input v-model="password" type="password" class="form-control" placeholder="Parool">
        <label>Parool uuesti</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Eesnimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Perenimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>E-mail</label>
      </div>
    </template>

    <template #buttons>
      <button @click="$emit('event-close-modal')" type="submit" class="btn btn-outline-secondary me-3">Sulge</button>
      <button @click="$emit('event-create-new-user-executed')" type="submit" class="btn btn-outline-success">Loo konto</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'NewUserModal',
  components: {Modal},
  props: {
    newUserModalIsOpen: Boolean
  }
}
</script>