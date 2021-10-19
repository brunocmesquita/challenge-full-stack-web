import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    register: false,
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
    initialize() {
      axios
        .get('http://localhost:3333/api/users')
        .then(res => (this.users = res.data.data));
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
