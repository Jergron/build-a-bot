import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  /* Anything you add to state you first need to explicitly define it's model. */
  state: {
    cart: [],
    parts: null,
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  actions: {
    /* Commit function is how to call mutations on the store. */
    getParts({ commit }) {
      axios.get('/api/parts')
        .then(result => commit('updateParts', result.data))
        .catch(console.error);
    },
  },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter(item => item.head.onSale);
    },
  },
});
