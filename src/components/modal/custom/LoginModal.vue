<template>
  <Modal :modal-is-open="loginModalIsOpen">
    <template #title>
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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