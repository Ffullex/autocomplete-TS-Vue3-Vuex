<template>
  <div class="autocomplete">
    <div class="autocomplete__input">
      <img src="@/assets/Vector.png" alt="" class="autocomplete__input__search-icon" />
      <input
        class="autocomplete__input__field"
        id="myUsers"
        name="myUsers"
        v-model="inputValue"
        @focus="onFocus"
      />
    </div>
    <div class="autocomplete__list" v-if="isTyping">
      <img
        src="@/assets/Rectangle.png"
        alt=""
        class="loader"
        v-if="isLoading"
      />
      <div
        class="autocomplete__list__option"
        v-for="human in filteredPeople"
        :key="human.id"
        @click="onClick(human.name)"
      >
        <div class="autocomplete__list__option__img">
          <img :src="human.url" alt="" class="autocomplete__list__option__img1"/>
        </div>
        <div>
          <div class="autocomplete__list__option__name">{{ human.name }}</div>
          <div class="autocomplete__list__option__username">
            @{{ human.username.toLowerCase() }}
          </div>
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
      urlec: "https://via.placeholder.com/600/92c952",
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

<style scoped lang="scss">
.autocomplete {
  margin: 0 auto;
  border-radius: 15px;
  &__input {
    min-width: 343px;
    max-width: 345px;
    border-bottom: 1px solid black;
    margin: 0 auto;
    display: inline-flex;
    background-color: #f9f9f9;
    &__search-icon {
      margin: 19px;
      height: 17px;
      width: 17px;
    }
    &__field {
      background-color: #f9f9f9;
      font-size: 22px;
      height: 56px;
      border: none;
      outline: none;
    }
  }

  &__list {
    max-height: 360px;
    height: 180px;
    overflow: hidden;
    min-width: 343px;
    max-width: 345px;
    margin: 0 auto;
    &__option:hover {
      background-color: #e5e5e5;
      cursor: pointer;
    }
    &__option {
      margin: 0 auto;
      font-size: 19px;
      height: 48px;
      text-align: left;
      display: flex;
      &__img {
        margin-right: 4px;
      }
      &__img1 {
        margin: 4px;
        background-color: #dedddd;
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      &__username {
        color: #a2a2a2;
      }
    }
  }
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
