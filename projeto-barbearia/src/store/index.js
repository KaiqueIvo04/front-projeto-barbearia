import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      isAuthenticated: false,
      role: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user.isAuthenticated = user.isAuthenticated;
      state.user.role = user.role;
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.role = null;
    }
  },
  getters: {
    isAuthenticated: state => state.user.isAuthenticated,
    role: state => state.user.role
  },
  actions: {
    login({ commit }, user) {
      // Lógica de login
      commit('setUser', user);
    },
    logout({ commit }) {
      // Lógica de logout
      commit('logout');
    }
  },
  modules: {
    // Outros módulos Vuex
  }
});
