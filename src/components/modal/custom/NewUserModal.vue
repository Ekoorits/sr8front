<template>
  <Modal :modal-is-open="newUserModalIsOpen"
          @event-close-modal="$emit('event-close-modal')">

    <template #title>
      Loo uus kasutaja
    </template>

    <template #body>
      <div>
        <AlertDanger :alert-message="errorMessage" @event-alert-box-closed="resetMessages"></AlertDanger>
        <AlertSuccess :alert-message="successMessage" @event-alert-box-closed="resetMessages"></AlertSuccess>
      </div>
      <div class="form-floating mb-3">
        <input v-model="newUser.username" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Kasutajanimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="newUser.password" type="password" class="form-control" placeholder="Parool">
        <label>Parool</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="passwordRepeat" type="password" class="form-control" placeholder="Parool">
        <label>Parool uuesti</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="newUser.firstName" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Eesnimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="newUser.lastName" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>Perenimi</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="newUser.email" type="text" class="form-control" placeholder="Kasutajanimi">
        <label>E-mail</label>
      </div>
    </template>

    <template #buttons>
      <button @click="$emit('event-close-modal')" type="submit" class="btn btn-outline-secondary me-3">Sulge</button>
      <button @click="executeAddNewUser" type="submit" class="btn btn-outline-success">Loo konto</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import UserService from "@/services/UserService";
import NavigationService from "@/services/NavigationService";
import AlertDanger from "@/components/modal/alerts/AlertDanger.vue";
import AlertSuccess from "@/components/modal/alerts/AlertSuccess.vue";

export default {
  name: 'NewUserModal',
  components: {AlertSuccess, AlertDanger, Modal},
  props: {
    newUserModalIsOpen: Boolean
  },
  emits: [
      'event-close-modal',
      'event-create-new-user-executed'
  ],
  data() {
    return{
      errorMessage:'',
      successMessage:'',
      passwordRepeat:'',
        newUser:{
          username: '',
          password: '',
          firstName:'',
          lastName:'',
          email:''
        },
      errorResponse:{
        message:'',
        errorCode: 0

    }
      }
    },
  methods:{
    executeAddNewUser() {
      UserService.sendPostNewUserRequest(this.newUser)
          .then(() => this.handleAddNewUserResponse())
          .catch(error => this.handleAddNewUserError(error))
    },
    handleAddNewUserResponse() {
      this.successMessage='Kasutaja' + this.newUser.username +'edukalt loodud!'
      setTimeout(this.resetMessages,4000)
      this.resetAllFields()
      this.delayedCloseModal()
    },
    handleAddNewUserError(error) {
      this.errorResponse=error.response.data
      if (this.userNameAlreadyExists(error)) {
        this.displayUserNameAlreadyAlert();
      } else {
        NavigationService.navigateToErrorView()
      }
    },
    userNameAlreadyExists(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === 333;
    },
    displayUserNameAlreadyAlert() {
      this.errorMessage =this.errorResponse.message
      setTimeout(this.resetMessages,4000)
    },

    resetAllFields() {
          this.newUser.username = ''
          this.newUser.password= ''
          this.passwordRepeat= ''
          this.newUser.firstName=''
          this.newUser.lastName=''
          this.newUser.email=''
    },
    resetMessages() {
      this.errorMessage=''
      this.successMessage=''
    },
    delayedCloseModal() {
      setTimeout(() => {
        this.$emit('event-close-modal', 4000);
      });
    },
  },
}
</script>