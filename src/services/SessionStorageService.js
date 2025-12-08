export default {
    isLoggedIn() {
        return sessionStorage.getItem('roleName') !== null
    },

    isAdmin() {
        return sessionStorage.getItem('roleName') === 'admin'
    },

    isModerator() {
      return sessionStorage.getItem('roleName') === 'moderator'
    },

    isCustomer() {
      return sessionStorage.getItem('roleName') === 'customer'
    },

    getUserId(){
        return sessionStorage.getItem('userId')
    }
}