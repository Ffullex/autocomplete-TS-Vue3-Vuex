// import {ActionTree, createStore, GetterTree, MutationTree} from "vuex";
// import {Human, Photo, PhotoList} from "@/types";
//
// export type RootState = {
//   people: Human[];
//   isLoading: boolean;
// };
//
// export const initialState: RootState = {
//   people: [],
//   isLoading: false,
// };
//
// export const getters: GetterTree<RootState, RootState> = {
//   people: (state): Human[] => state.people,
//   loading: (state) => state.isLoading,
// };
//
// export const mutations: MutationTree<RootState> = {
//   SET_PEOPLE: (state, item: Human) => {
//     state.people.push(item);
//   },
//   SET_LOADING: (state, isLoading: boolean) => {
//     state.isLoading = isLoading;
//   },
// };
// export const actions: ActionTree<RootState, RootState> = {
//   async getPeople({ commit }) {
//     commit("SET_LOADING", true);
//     const [apiUser, apiPhoto] = await Promise.all([
//       fetch("https://jsonplaceholder.typicode.com/users"),
//       fetch("https://jsonplaceholder.typicode.com/photos"),
//     ]);
//     let people = await apiUser.json();
//     const photos: PhotoList = await apiPhoto.json();
//     people = people.map((human: Human) => {
//       const photo = photos.find(
//         (photo: Photo) => photo.id === human.id
//       ) as Photo;
//       if (photo) {
//         return { ...human, url: photo.url };
//       }
//       return human;
//     });
//     commit("SET_PEOPLE", people);
//     commit("SET_LOADING", false);
//   },
// };
// const store = createStore<RootState>({
//   state: initialState,
//   mutations,
//   actions,
//   getters,
// });
//
// export default store;
