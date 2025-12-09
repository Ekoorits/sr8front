<template>
  <button @click="handleClick" type="button" class="btn btn-primary btn-custom-large">{{ label }}</button>
</template>
<script>
export default {
  name: 'LargeButton',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  emits: ['event-button-is-pressed'],
  methods: {
    handleClick() {
      this.$emit('event-button-is-pressed');
    }
  }
}
</script>