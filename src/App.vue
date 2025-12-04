<template>
  <LoginModal :login-modal-is-open="loginModalIsOpen"
              :new-user-modal-is-open="newUserModalIsOpen"
              @open-new-user-modal="openNewUserModal"
              @event-close-login-modal="closeLogInModal"
              @event-log-in-executed="executeLogIn"
  />
              <!--- TODO: implement close and execute LogIn -->

  <nav>
    <router-link to="/">Kodu</router-link> |
  </nav>
  <button @click="loginModalIsOpen=true">Logi sisse</button>
  <router-view/>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import LoginModal from "@/components/modal/custom/LoginModal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";

export default {
  name: 'App',
  components: {NewUserModal, LoginModal, Modal},

  data(){
    return {
      isLoggedIn: false,
      isAdmin: false,
      isModerator: false,
      loginModalIsOpen: false,
      newUserModalIsOpen: false
    }
  },
  methods: {

    openNewUserModal() {
      this.newUserModalIsOpen = true
    },

    closeLogInModal() {
      this.loginModalIsOpen = false
    }

  }
}
</script>