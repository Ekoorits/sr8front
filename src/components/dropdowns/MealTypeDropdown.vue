<template>
  <select @change="selectNewMealType($event.target.value)" :value="selectedMealType" class="form-select">
    <option selected :value="''" disabled>Toidukord</option>
    <option v-for="mealType in mealTypes" :value="mealType.mealTypeName">{{mealType.mealTypeName}}</option>
  </select>
</template>
<script>
export default {
  name: 'MealTypeDropdown',
  props: {
    mealTypes: Array,
    selectedMealType: {
      type: String,
      default: ''
    }
  },
  emits: [
    'event-new-meal-type-selected'
  ],
  methods: {
    selectNewMealType(selectedMealType) {
      this.$emit('event-new-meal-type-selected', String(selectedMealType))
    },
  }
}
</script>