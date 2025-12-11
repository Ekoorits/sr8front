<template>
  <div class="filters-bar d-flex align-items-center gap-3 flex-wrap mb-3">
    <span class="fw-semibold">Filtreeri:</span>

    <div class="filter-dropdown">
      <MealTypeDropdown
          :meal-types="mealTypes"
          :selected-meal-type="selectedMealType"
          @event-new-meal-type-selected="onMealTypeChange"
      />
    </div>
    <div class="filter-dropdown">
      <DifficultiesDropdown
          :difficulties="difficulties"
          :selected-difficulty="selectedDifficulty"
          @event-new-difficulty-selected="onDifficultyChange"
      />
    </div>
    <div class="filter-dropdown">
      <CookingTimeDropdown
          :cooking-times="cookingTimes"
          :selected-cooking-time="selectedCookingTime"
          @event-new-cooking-time-selected="onCookingTimeChange"
      />
    </div>
    <span class="mx-2 text-muted">|</span>
    <div class="dropdown">
      <a
          class="dropdown-toggle text-decoration-none"
          href="#"
          data-bs-toggle="dropdown"
      >
        ↑ Sort: {{ sortLabel }}
      </a>
      <ul class="dropdown-menu">
        <li>
          <button class="dropdown-item" @click="onSortChange('NEWEST')">
            Uuemad
          </button>
        </li>
        <li>
          <button class="dropdown-item" @click="onSortChange('OLDEST')">
            Vanaimad
          </button>
        </li>
      </ul>
    </div>
    <button class="btn btn-link p-0" @click="clearFilters">
      Kõik filtrid
    </button>
  </div>
</template>
<script>
import CookingTimeDropdown from '@/components/dropdowns/CookingTimeDropdown.vue'
import DifficultiesDropdown from '@/components/dropdowns/DifficultiesDropdown.vue'
import MealTypeDropdown from '@/components/dropdowns/MealTypeDropdown.vue'
import MealTypeService from '@/services/MealTypeService'
import DifficultyService from '@/services/DifficultyService'
import CookingTimeService from '@/services/CookingTimeService'

export default {
  name: 'RecipeFilter',
  components: {
    CookingTimeDropdown,
    DifficultiesDropdown,
    MealTypeDropdown,
  },
  emits: ['filters-changed'],
  data() {
    return {
      filters: {
        cookingTimeId: null,
        difficultyId: null,
        mealTypeId: null,
      },
      sort: 'NEWEST',
      mealTypes: [],
      selectedMealType: '',
      difficulties: [],
      selectedDifficulty: '',
      cookingTimes: [],
      selectedCookingTime: ''
    }
  },
  computed: {
    sortLabel() {
      return this.sort === 'NEWEST' ? 'Uuemad' : 'Vanaimad'
    },
  },
  mounted() {
    MealTypeService.sendGetMealTypesRequest()
        .then(response => {
          this.mealTypes = response.data
        })
        .catch(() => {})
    DifficultyService.sendGetDifficultiesRequest()
        .then(response => {
          this.difficulties = response.data
        })
        .catch(() => {})
    CookingTimeService.sendGetCookingTimeRequest()
        .then(response => {
          this.cookingTimes = response.data
        })
        .catch(() => {})
  },
  methods: {
    emitChange() {
      this.$emit('filters-changed', {
        ...this.filters,
        sort: this.sort,
      })
    },
    onMealTypeChange(value) {
      this.selectedMealType = value
      this.filters.mealTypeId = value   // если бэк фильтрует по названию
      this.emitChange()
    },
    onDifficultyChange(value) {
      this.selectedDifficulty = value
      this.filters.difficultyId = value
      this.emitChange()
    },
    onCookingTimeChange(value) {
      this.selectedCookingTime = value
      this.filters.cookingTimeId = value
      this.emitChange()
    },
    onSortChange(value) {
      this.sort = value
      this.emitChange()
    },
    clearFilters() {
      this.filters = {
        cookingTimeId: null,
        difficultyId: null,
        mealTypeId: null,
      }
      this.sort = 'NEWEST'
      this.selectedMealType = ''
      this.selectedDifficulty = ''
      this.selectedCookingTime = ''
      this.emitChange()
    },
  },
}
</script>
