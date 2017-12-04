import * as Types from './types';

export const actions = {
  /**
   * 增加
   * @param commit
   * @param n
   */
  [Types.INCREMENT]({commit}, n) {
    commit(Types.INCREMENT, n);
  },
  /***
   * 减少
   * @param commit
   * @param n
   */
  [Types.DECREMENT]({commit}, n) {
    commit(Types.DECREMENT, n);
  }
};
//import {actions} from './actions';
/*
export default {
  /!**
   * 增加
   * @param commit
   * @param n
   *!/
  [Types.INCREMENT]({commit}, n) {
    commit(Types.INCREMENT, n);
  },
  /!***
   * 减少
   * @param commit
   * @param n
   *!/
  [Types.DECREMENT]({commit}, n) {
    commit(Types.DECREMENT, n);
  }
};
import actions from 'actions';
*/
