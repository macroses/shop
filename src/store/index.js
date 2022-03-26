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
      state.favorites = state.favorites.filter(el => el[1] !== favorite[1])
      state.favorites = [...state.favorites, favorite]
    }
  },
  actions: {}
})
