<template>
  <button @click="handleClick" type="button" class="btn btn-primary btn-lg">{{ label }}</button>
</template>
<script>
export default {
  name: 'SmallButton',
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