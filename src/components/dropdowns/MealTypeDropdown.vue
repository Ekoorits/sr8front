<template>
  <select
      class="form-select"
      :value="selectedMealType"
      @change="selectNewMealType($event.target.value)"
  >
    <option disabled value="">Toidukord</option>

    <option
        v-for="mealType in mealTypes"
        :key="mealType.mealTypeId"
        :value="mealType.mealTypeId"
    >
      {{ mealType.mealTypeName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MealTypeDropdown',

  props: {
    mealTypes: Array,
    selectedMealType: {
      type: [Number, String],
      default: ''
    }
  },

  emits: ['event-new-meal-type-selected'],

  methods: {
    selectNewMealType(value) {
      if (value === '') {
        this.$emit('event-new-meal-type-selected', null)
      } else {
        this.$emit('event-new-meal-type-selected', Number(value))
      }
    }
  }
}
</script>
