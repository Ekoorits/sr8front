<template>
  <Modal :modal-is-open="newUserModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >

    <template #title>
      Loo uus kasutaja
    </template>

    <template #body>
      <div>
        <AlertDanger :alert-message="errorMessage" @event-alert-box-closed="resetMessages"/>
        <AlertSuccess :alert-message="successMessage" @event-alert-box-closed="resetMessages"/>
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
import AlertDanger from "@/components/modal/alerts/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import AlertSuccess from "@/components/modal/alerts/AlertSuccess.vue";
import navigationService from "@/services/NavigationService";
import LoginService from "@/services/LoginService";

export default {
  name: 'NewUserModal',
  components: {AlertSuccess, AlertDanger, Modal},
  props: {
    newUserModalIsOpen: Boolean
  },
  emits: [
    'event-close-modal',
    'event-user-logged-in'
  ],

  data() {
    return {
      errorMessage: '',
      successMessage: '',
      passwordRepeat: '',

      newUser: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {
    executeAddNewUser() {
      if (this.newUser.password !== this.passwordRepeat) {
        this.errorMessage = 'Paroolid ei kattu';
        setTimeout(this.resetMessages, 4000);
        return;
      }
      UserService.sendPostNewUserRequest(this.newUser)
          .then(() => this.handleAddNewUserResponse())
          .catch(error => this.handleAddNewUserError(error))
    },

    handleAddNewUserResponse() {
      this.successMessage = 'Kasutaja ' + this.newUser.username + ' edukalt loodud!';

      // Uue kasutaja logitakse automaatselt sisse:
      LoginService.sendGetLoginRequest(this.newUser.username, this.newUser.password)
          .then(response => {
            // Andmete lisamine session storage'sse
            const loginResponse = response.data;
            sessionStorage.setItem('userId', loginResponse.userId);
            sessionStorage.setItem('roleName', loginResponse.roleName);
            sessionStorage.setItem('userName', loginResponse.userName);

            // Anname App.vue-le teada, et uus kasutaja on sisse logitud
            this.updateNavMenuUserIsLoggedIn();

            //Modali sulgemine, väljade tühjendamine, koduvaatele juhendamine
            setTimeout(() => {
              this.resetMessages();
              this.resetAllFields();
              this.$emit('event-close-modal');
              navigationService.navigateToHomeViewUserLoggedIn();
            }, 2000);
          })
          .catch(() => {
            this.errorMessage = "Viga sisselogimisel peale kasutaja loomist.";
            setTimeout(this.resetMessages, 4000);
          });
    },

    updateNavMenuUserIsLoggedIn() {
      this.$emit('event-user-logged-in')
    },

    handleAddNewUserError(error) {
      this.errorResponse = error.response.data

      if (this.userNameAlreadyExists(error)) {
        this.displayUsernameAlreadyExistsAlert();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    userNameAlreadyExists(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === 333;
    },

    displayUsernameAlreadyExistsAlert() {
      this.errorMessage = this.errorResponse.message
      setTimeout(this.resetMessages, 4000)
    },

    resetAllFields() {
      this.newUser.username = ''
      this.newUser.password = ''
      this.passwordRepeat = ''
      this.newUser.firstName = ''
      this.newUser.lastName = ''
      this.newUser.email = ''
    },

    resetMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    }
  }
}
</script>
