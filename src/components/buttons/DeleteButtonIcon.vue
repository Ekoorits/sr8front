<template>
  <font-awesome-icon @click="handleClick"
                     type="button"
                     class="btn"
                     icon="fa-regular fa-trash-can" />
</template>
<script>
export default {
  name: 'DeleteButtonIcon',
  props: {},
  emits: [
    'event-button-is-pressed'
  ],
  methods: {
    handleClick() {
      this.$emit('event-button-is-pressed');
    }
  }
}
</script>