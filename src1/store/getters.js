/**
 * state的计算属性
 * @type {{}}
 */
export const getters = {
  myCount(state) {
    var ret = state.count % 2 == 0 ? "偶数" : "奇数";
    console.info(ret);
    return ret;
  }
};

