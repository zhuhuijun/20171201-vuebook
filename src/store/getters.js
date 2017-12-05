let getters = {
  myCount: (state) => state.cartList.reduce((pre, next) => pre + next.bookCount, 0)
};

export default getters;
