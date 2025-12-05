<template>
  <transition name="fade">
    <div v-if="alertMessage !==''" class="alert alert-success alert-dismissible fade show" role="alert">
      {{alertMessage}}
      <button @click="$emit('event-alert-box-closed')" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    alertMessage: String,
  }
}
</script>