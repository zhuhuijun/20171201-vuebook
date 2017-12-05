import Vue from 'vue';
import Vuex from 'vuex';
import {actions} from './actions';
import mutations from "./mutations";
import logger from 'vuex/dist/logger';

Vue.use(Vuex);


const state = {
  cartList: []
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [logger()],
  strict: true
});
