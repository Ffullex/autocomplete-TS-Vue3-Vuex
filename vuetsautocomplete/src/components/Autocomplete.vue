<template>
  <div>
    <input
      id="myUsers"
      name="myUsers"
      v-model="inputValue"
      @focus="onFocus"
    />

    <div v-show="isTyping">
      <div v-if="isLoading">Loading...</div>
      <div v-for="human in filteredPeople" :key="human.id" @click="onClick(human.name)">
        {{ human.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Human, Photo, PhotoList } from "@/types";

export default defineComponent({
  name: "Autocomplete",
  data() {
    return {
      people: [],
      isTyping: false,
      isLoading: false,
      inputValue: "",
    };
  },
  computed: {
    filteredPeople(): Human[] {
      return this.people.filter((human: Human) =>
        human.name.includes(this.inputValue)
      );
    },
  },
  methods: {
    onFocus() {
      this.isTyping = true;
      this.inputValue = "";
      this.getInfo();
    },
    onClose(event: Event) {
      console.log(event);
      if (event.target) {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.id !== "myUsers") {
          this.isTyping = false;
        }
      }
    },
    onClick(value: string) {
      this.inputValue = value;
      this.isTyping = false;
    },
    async getInfo() {
      this.isLoading = true;
      this.people = [];
      const apiUser = await fetch("https://jsonplaceholder.typicode.com/users");
      const people = await apiUser.json();
      const apiPhoto = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const photos: PhotoList = await apiPhoto.json();
      this.people = people.map((human: Human) => {
        const photo = photos.find(
          (photo: Photo) => photo.id === human.id
        ) as Photo;
        if (photo) {
          return { ...human, url: photo.url };
        }
        return human;
      });
      console.log(this.people);
      this.isLoading = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.onClose);
  },
  unmounted() {
    document.removeEventListener("click", this.onClose);
  }
});
</script>

<style scoped></style>
