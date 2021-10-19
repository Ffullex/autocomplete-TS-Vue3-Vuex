<template>
  <div>
    <select>
      <option v-for="item in people" :key="item.id">
        {{ item.name }}
      </option>
    </select>
    <button @click="getApiInfo">Получить список</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Autocomplete",
  data() {
    return {
      citiesList: [
        {id: 1, name: "a"},
        {id: 2, name: "b"},
        {id: 3, name: "c"},
      ],
      people: []
    }
  },
  methods: {
    async getApiInfo() {
      const appi = await fetch("https://jsonplaceholder.typicode.com/users")
      this.people = await appi.json();
      console.log(this.people)
    }
  }
});

</script>

<style scoped>

</style>