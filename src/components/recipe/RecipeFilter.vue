<template>
  <div class="filters-bar d-flex align-items-center gap-3 flex-wrap mb-3">
    <span class="fw-semibold">Filtreeri:</span>

    <div class="filter-dropdown">
      <MealTypeDropdown @change="onMealTypeChange" />
    </div>

    <div class="filter-dropdown">
      <DifficultiesDropdown @change="onDifficultyChange" />
    </div>

    <div class="filter-dropdown">
      <CookingTimeDropdown @change="onCookingTimeChange" />
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
    }
  },
  computed: {
    sortLabel() {
      return this.sort === 'NEWEST' ? 'Uuemad' : 'Vanaimad'
    },
  },
  methods: {
    emitChange() {
      this.$emit('filters-changed', {
        ...this.filters,
        sort: this.sort,
      })
    },
    onCookingTimeChange(id) {
      this.filters.cookingTimeId = id
      this.emitChange()
    },
    onDifficultyChange(id) {
      this.filters.difficultyId = id
      this.emitChange()
    },
    onMealTypeChange(id) {
      this.filters.mealTypeId = id
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
      this.emitChange()
    },
  },
}
</script>
