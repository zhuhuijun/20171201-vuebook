import * as Types from './types';

export const actions = {
  /**
   * 添加购物车
   * @param commit
   * @param onebook
   */
  [Types.ADD_CART]({commit}, oneBook) {
    commit(Types.ADD_CART, oneBook);
  }
};
