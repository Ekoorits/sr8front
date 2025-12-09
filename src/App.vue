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

  <nav v-if="isLoggedIn" class="p-3">
    <div class="row align-items-center">
      <div class="col">
      </div>
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <SmallButton label="Lisa retsept" @event-button-is-pressed="toRecipeDetailsView"/>
          </div>
          <div class="col-auto">
            <SmallButton v-if="!isMyRecipesView" label="Minu retseptid" @event-button-is-pressed="toMyRecipesView"/>
            <SmallButton v-else label="Kodu" @event-button-is-pressed="toHomeView"/>
          </div>
          <div class="col-auto">
            <SmallButton label="Ostunimekirjad" @event-button-is-pressed="toShoppingLists"/>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-end">
        <!-- Logout icon aligned to the right -->
        <div @click="handleUserLogout" style="text-align: center; cursor: pointer;">
          <font-awesome-icon icon="fa-solid fa-person-walking-arrow-right" size="2x"/>
          <div>{{ username }}</div>
        </div>
      </div>
    </div>
  </nav>

  <button v-if="!isLoggedIn" type="submit" class="btn btn-outline-success mt-3" @click="loginModalIsOpen=true">Logi sisse</button>

  <router-view/>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import LoginModal from "@/components/modal/custom/LoginModal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";
import router from "@/router";
import SmallButton from "@/components/buttons/SmallButton.vue";
import navigationService from "@/services/NavigationService";
import NavigationService from "@/services/NavigationService";

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
      NavigationService.navigateToHomeView()
    },

    toShoppingLists() {
      NavigationService.navigateToShoppingListsView()
    },

    toRecipeDetailsView() {
      NavigationService.navigateToRecipeDetailsView()
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
