import * as Types from './types';

const mutations = {
  /***
   * 添加购物车
   * @param state
   * @param onebook
   */
  [Types.ADD_CART](state, onebook) {
    let product = state.cartList.find(item => item.bookId == onebook.bookId);
    if (product) {
      product.bookCount += 1;
    } else {
      onebook.bookCount = 1;
      state.cartList = [...state.cartList, onebook];
    }
  }
};

export default mutations;
