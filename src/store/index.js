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
      if(state.favorites.includes(favorite)) {
        state.favorites.splice(state.favorites.indexOf(favorite), 1)
      }
      else {
        state.favorites = [...state.favorites, favorite]
      }
    }
  },
  actions: {}
})
