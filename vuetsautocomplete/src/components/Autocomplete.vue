<template>
  <div class="autocomplete">
    <input
      class="autocomplete__input"
      id="myUsers"
      name="myUsers"
      v-model="inputValue"
      @focus="onFocus"
    />
    <div class="autocomplete__list__mucosa-external">
      <div class="autocomplete__list" v-if="isTyping">
        <img src="@/assets/Rectangle.png" alt="" class="loader" v-if="isLoading" />
        <div
          class="autocomplete__list__option"
          v-for="human in filteredPeople"
          :key="human.id"
          @click="onClick(human.name)"
        >
          {{ human.name }}
        </div>
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
  },
});
</script>

<style scoped>

.autocomplete__input {
  background-color: #f9f9f9;
  font-size: 22px;
  width: 343px;
  height: 56px;
}
.autocomplete__list__mucosa-external {
  max-height: 222px !important;
}
.autocomplete__list {
  background-color: white;
  max-height: 360px;
  height: 180px;
  overflow: auto;
  max-width: 343px;
  margin: 0 auto;
}
.autocomplete__list__option {
  margin: 0 auto;
  background-color: white;
  font-size: 19px;
  width: 343px;
  height: 48px;
  text-align: left;
}
.loader {
  pointer-events: none;
  margin-top: 50px;
}
@media (prefers-reduced-motion: no-preference) {
  .loader {
    animation: loader-spin infinite 0.9s linear;
  }
}
@keyframes loader-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
