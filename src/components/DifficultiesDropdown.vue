<template>
  <select @change="selectNewDifficulty($event.target.value)" :value="selectedDifficultyId" class="form-select">
    <option selected :value="0" >Raskustase</option>
    <option v-for="difficulty in difficulties" :value="difficulty.difficultyId">{{city.levelName}}</option>
  </select>
</template>
<script>
export default {
  name: 'DifficultiesDropdown',
  props: {
    difficulties: Array,
    selectedDifficultyId: {
      type: Number,
      default: 0
    }
  },
  emits: [
    'event-new-difficulty-selected'
  ],
  methods: {
    selectNewDifficulty(selectedDifficultyId) {
      this.$emit('event-new-difficulty-selected', Number(selectedDifficultyId))
    },
  }
}
</script>