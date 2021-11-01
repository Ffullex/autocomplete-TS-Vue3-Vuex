import { mount } from "@vue/test-utils";
import Autocomplete from "../../src/components/Autocomplete";


describe("Autocomplete.vue", () => {
  it("При фокусе на input появляется div", async () => {
    const wrapper = mount(Autocomplete);
    const input = wrapper.find("#myUsers");
    expect(wrapper.find('[data-test="list"]').exists()).toBe(false);

    await input.trigger("focus");
    console.log(wrapper.html());
    expect(wrapper.find('[data-test="list"]').exists()).toBe(true);
  });
});
