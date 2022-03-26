import { createStore } from 'vuex'

export default createStore({
  state: {
    favorites: []
  },
  getters: {
    favorites: state => state.favorites
  },
  mutations: {
    addFavorite(state, favorite) {
      state.favorites = state.favorites.filter(el => el !== favorite)
      state.favorites = [...state.favorites, favorite]
    }
  },
  actions: {}
})
