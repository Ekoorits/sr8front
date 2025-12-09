<template>
  <font-awesome-icon @click="handleClick"
                     type="button"
                     class="btn"
                     icon="fa-regular fa-pen-to-square" />
</template>
<script>
export default {
  name: 'EditButtonIcon',
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