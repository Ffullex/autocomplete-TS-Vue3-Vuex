<template>
  <div>
    <input list="users" id="myUsers" name="myUsers" v-model="unclearID" />
    <datalist id="users">
      <option v-for="item in people" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </datalist>

    <div v-if="ID">
      <img :src="imageUrl" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Photo, PhotoList } from "@/types";

export default defineComponent({
  name: "Autocomplete",
  data() {
    return {
      people: [],
      photos: [] as PhotoList,
      photos1: [] as PhotoList,
      album: [],
      ID: undefined as (number | undefined),
    };
  },
  computed: {
    imageUrl(): string {
      if (this.ID !== undefined) {
        const photo = this.photos.find(
          (photo: Photo) => photo.id === this.ID
        ) as Photo;
        console.log(photo);
        if (photo) {
          return photo.url;
        }
      }
      return '';
    },
    unclearID: {
      set(value: string): void {
        this.ID = Number(value);
      },
      get(): number | undefined {
        return this.ID;
      }
    }
  },
  methods: {
    async getInfo() {
      const apiUser = await fetch("https://jsonplaceholder.typicode.com/users");
      this.people = await apiUser.json();
      console.log(this.people);
      const apiPhoto = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      this.photos = await apiPhoto.json();
      console.log(this.photos);
    },
  },
  mounted() {
    this.getInfo();
  },
});
</script>

<style scoped></style>
