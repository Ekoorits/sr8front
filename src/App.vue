<template>
  <LoginModal :login-modal-is-open="loginModalIsOpen"
              @event-open-new-user-modal="openNewUserModal"
              @event-close-modal="closeLogInModal"
              @event-user-logged-in="handleUserLoggedIn"
  />
  <NewUserModal :new-user-modal-is-open="newUserModalIsOpen"
                @event-close-modal="closeNewUserModal"
                @event-user-logged-in="handleUserLoggedIn"
  />

  <nav v-if="isLoggedIn">

    <button v-if="!isLoggedIn" type="submit" class="btn btn-outline-success" @click="loginModalIsOpen=true">Logi sisse</button>
    <div v-if="isLoggedIn" @click="handleUserLogout" style="float: right; text-align: center; cursor: pointer; margin-right: 20px;">
      <font-awesome-icon icon="fa-solid fa-person-walking-arrow-right" size="2x"/>
      <div>{{ username }}</div>
    </div>

    <div class="container text-center">
      <div class="row justify-content-center mb-5">
        <div class="col-auto">
          <SmallButton label="Lisa retsept"/>
        </div>
        <div class="col-auto">
          <SmallButton v-if="!isMyRecipesView" label="Minu retseptid" @event-button-is-pressed="toMyRecipesView"/>
          <SmallButton v-else label="Kodu" @event-button-is-pressed="toHomeView"/>
        </div>
        <div class="col-auto">
          <SmallButton label="Ostunimekirjad"/>
        </div>
      </div>
    </div>

  </nav>


  <router-view/>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import LoginModal from "@/components/modal/custom/LoginModal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";
import router from "@/router";
import SmallButton from "@/components/buttons/SmallButton.vue";
import navigationService from "@/services/NavigationService";

export default {
  name: 'App',
  components: {SmallButton, NewUserModal, LoginModal, Modal},
  data() {
    return {
      isLoggedIn: false,
      loginModalIsOpen: false,
      newUserModalIsOpen: false,
      username: ''
    }
  },
  computed: {
    isMyRecipesView() {
      return this.$route.name === 'myRecipesRoute';
    }
  },
  methods: {
    openNewUserModal() {
      this.newUserModalIsOpen = true
    },
    closeNewUserModal() {
      this.newUserModalIsOpen = false
    },
    closeLogInModal() {
      this.loginModalIsOpen = false
    },
    handleUserLoggedIn() {
      this.isLoggedIn = true;
      this.username = sessionStorage.getItem('userName');
    },
    toMyRecipesView() {
      navigationService.navigateToMyRecipesView()
    },
    toHomeView() {
      navigationService.navigateToHomeViewUserLoggedIn()
    },
    handleUserLogout() {
      sessionStorage.clear();
      this.isLoggedIn = false;
      this.username = '';
      router.push({name: 'homeRoute'});
    }
  },
  mounted() {
    this.isLoggedIn = sessionStorage.getItem('userId') !== null;
    if (this.isLoggedIn) {
      this.username = sessionStorage.getItem('userName');
    }
  }
}
</script>
