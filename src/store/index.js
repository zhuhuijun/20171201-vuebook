import Vue from 'vue';
import Vuex from 'vuex';
import {actions} from './actions';
import mutations from "./mutations";
import getters from "./getters";
import logger from 'vuex/dist/logger';

Vue.use(Vuex);


const state = {
  cartList: []
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [logger()],
  strict: true
});
