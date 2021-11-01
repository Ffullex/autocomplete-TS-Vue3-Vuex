import { Store } from "vuex";
import { RootState } from "@/store/store"; // path to store file;
import { ComponentCustomProperties } from "vue";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
