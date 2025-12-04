<template>
  <LoginModal :login-modal-is-open="loginModalIsOpen"
              @event-close-modal="closeLogInModal"
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

export default {
  name: 'App',
  components: {LoginModal, Modal},

  data(){
    return {
      isLoggedIn: false,
      isAdmin: false,
      isModerator: false,
      loginModalIsOpen: false
    }
  },
  methods: {

    closeLogInModal() {
      this.loginModalIsOpen = false
    }

  }
}
</script>