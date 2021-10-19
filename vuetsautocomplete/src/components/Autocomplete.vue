<template>
  <div>
    <select>
      <option v-for="item in citiesList" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "Autocomplete",
  data() {
    return {
    citiesList: [
      {id:1, name: "a"},
      {id:2, name: "b"},
      {id:3, name: "c"},
    ]
  }},
});
</script>

<style scoped>

</style>