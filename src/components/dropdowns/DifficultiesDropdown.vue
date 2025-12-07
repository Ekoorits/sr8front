<template>
  <select @change="selectNewDifficulty($event.target.value)" :value="selectedDifficultyLevelNumber" class="form-select">
    <option selected :value="0" disabled>Raskustase</option>
    <option v-for="difficulty in difficulties" :value="difficulty.difficultyLevelNumber">{{difficulty.difficultyLevelName}}</option>
  </select>
</template>
<script>
export default {
  name: 'DifficultiesDropdown',
  props: {
    difficulties: Array,
    selectedDifficultyLevelNumber: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'event-new-difficulty-selected'
  ],
  methods: {
    selectNewDifficulty(selectedDifficultyLevelNumber) {
      this.$emit('event-new-difficulty-selected', Number(selectedDifficultyLevelNumber))
    },
  }
}
</script>