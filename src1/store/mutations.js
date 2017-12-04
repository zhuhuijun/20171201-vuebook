import * as Types from './types';
//mutations不能写异步，只负责改变状态
export const mutations = {
  [Types.INCREMENT](state, n) {
    state.count += n;
  },
  [Types.DECREMENT](state, n) {
    state.count -= n;
  }
};
