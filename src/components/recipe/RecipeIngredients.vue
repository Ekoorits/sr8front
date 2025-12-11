<template>
  <div>
    <h4 class="mb-3 text-start">Koostisosad:</h4>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">koostisosa</th>
        <th scope="col">kogus</th>
        <th scope="col">ühik</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="ingredient in ingredients"
          :key="ingredient.id || ingredient.name"
      >
        <td>{{ ingredient.name }}</td>
        <td>{{ ingredient.amount }}</td>
        <td>{{ ingredient.measureUnit }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "RecipeIngredients",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>
