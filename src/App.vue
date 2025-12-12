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
          <div v-if="!isHomeView" class="col-auto">
            <SmallButton label="Kodu" @event-button-is-pressed="toHomeView"/>
          </div>
          <div v-if="!isRecipeDetailsView" class="col-auto">
            <SmallButton label="Lisa retsept" @event-button-is-pressed="toRecipeDetailsView"/>
          </div>
          <div v-if="!isMyRecipesView" class="col-auto">
            <SmallButton label="Minu retseptid" @event-button-is-pressed="toMyRecipesView"/>
          </div>
          <div v-if="!isShoppingListsView" class="col-auto">
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

  <SmallButton v-if="!isLoggedIn" class="mt-3" label="Logi sisse" @event-button-is-pressed="loginModalIsOpen=true"/>

  <router-view/>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import LoginModal from "@/components/modal/custom/LoginModal.vue";
import NewUserModal from "@/components/modal/custom/NewUserModal.vue";
import router from "@/router";
import SmallButton from "@/components/buttons/SmallButton.vue";
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
    },

    isHomeView() {
      return this.$route.name === 'homeRoute'
    },

    isRecipeDetailsView() {
      // Please adjust 'recipeDetailsRoute' to match the actual name of the route in your router configuration.
      return this.$route.name === 'recipeDetailsRoute';
    },

    isShoppingListsView() {
      // Please adjust 'shoppingListsRoute' to match the actual name of the route in your router configuration.
      return this.$route.name === 'shoppingListsRoute';
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
      NavigationService.navigateToMyRecipesView()
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
  },
}
</script>
