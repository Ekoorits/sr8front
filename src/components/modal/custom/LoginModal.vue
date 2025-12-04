<template>
  <Modal :modal-is-open="loginModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #title>
      Sisselogimine
    </template>

    <template #body>
      <div class="form-floating mb-3">
        <AlertDanger :alert-message="alertMessage" @event-alert-box-closed="resetAlertMessage"/>
      </div>
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
          <button @click="$emit('event-open-new-user-modal'); $emit('event-close-modal')" type="submit" class="btn btn-outline-success ms-2">Loo uus konto</button>
        </p>

      </div>
    </template>

    <template #buttons>
      <button @click="$emit('event-close-modal')" type="submit" class="btn btn-outline-secondary me-3">Sulge</button>
      <button @click="processLogin" type="submit" class="btn btn-outline-success">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";
import LoginService from "@/services/LoginService";
import NavigationService from "@/services/NavigationService";
import AlertDanger from "@/components/modal/alerts/AlertDanger.vue";

export default {
  name: 'LoginModal',
  components: {AlertDanger, NewUserModal, Modal},
  props: {
    loginModalIsOpen: Boolean,
    newUserModalIsOpen: Boolean
  },
  emits: [
      'event-close-modal',
      'event-open-new-user-modal'
  ],
  data() {
    return {
      username: '',
      password: '',
      alertMessage: '',

      loginResponse: {
        userId: 0,
        roleName: '',
        userName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },

  methods: {

    processLogin() {
      if (this.allFieldsHaveCorrectInput()) {
        this.executeLogin();
      } else {
        this.displayIncorrectInputAlert();
      }
    },

    allFieldsHaveCorrectInput() {
      return this.username !== '' && this.password !== '';
    },

    executeLogin() {
      LoginService.sendGetLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginError(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      this.setSessionStorageItems();
      this.$emit('event-close-modal')
    },

    setSessionStorageItems() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      sessionStorage.setItem('userName', this.loginResponse.userName)
    },

    updateNavMenuUserIsLoggedIn() {
      this.$emit('event-user-logged-in')
    },

    handleLoginError(error) {
      this.errorResponse = error.response.data
      if (this.incorrectCredentialsInput(error)) {
        this.displayIncorrectCredentialsAlert();
      } else {
        NavigationService.navigateToErrorView();
      }
    },

    incorrectCredentialsInput(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === 111;
    },

    displayIncorrectCredentialsAlert() {
      this.alertMessage = this.errorResponse.message
      setTimeout(this.resetAlertMessage, 4000)
    },

    displayIncorrectInputAlert() {
      this.alertMessage = 'Täida kõik väljad'
      setTimeout(this.resetAlertMessage, 4000)
    },

    resetAlertMessage() {
      this.alertMessage = '';
    },

  }
}
</script>