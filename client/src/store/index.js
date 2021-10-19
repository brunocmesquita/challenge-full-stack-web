import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    updateUser({ commit }) {
      commit('showSnackbar', 'Usuário atualizado');
    },
    deleteUser({ commit }) {
      commit('showSnackbar', 'Usuário deletado');
    },
    createUser({ commit }) {
      commit('showSnackbar', 'Usuário criado');
    },
  },

  modules: {},
});
