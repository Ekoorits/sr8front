<template>
  <select @change="selectNewCookingTime($event.target.value)" :value="selectedCookingTimeId" class="form-select">
    <option selected :value="0" disabled>Valmistusaeg</option>
    <option v-for="cookingTime in cookingTimes" :value="cookingTime.cookingTimeId"> ~ {{cookingTime.cookingTimeMinutesMax}} minutit</option>
  </select>
</template>
<script>
export default {
  name: 'CookingTimeDropdown',
  props: {
    cookingTimes: Array,
    selectedCookingTimeId: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'event-new-cooking-time-selected'
  ],
  methods: {
    selectNewCookingTime(selectedCookingTimeId) {
      this.$emit('event-new-cooking-time-selected', Number(selectedCookingTimeId))
    },
  }
}
</script>