<template>
  <div>
    <!-- только строка поиска с кнопкой -->
    <div class="input-group mb-3" style="max-width: 800px; margin: 0 auto;">
      <span class="input-group-text bg-white border-end-0">
        <i class="bi bi-search"></i>
      </span>

      <input
          ref="searchField"
          type="text"
          class="form-control border-start-0"
          placeholder="Otsi retsepti..."
          @keyup.enter="runSearch"
      >

      <button class="btn btn-primary" @click="runSearch">
        Otsi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipesSearch',

  methods: {
    runSearch() {
      const value = this.$refs.searchField.value.trim()
      this.$emit('event-search-text-changed', value)
    }
  }
}
</script>
