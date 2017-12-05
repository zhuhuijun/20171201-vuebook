// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false

//轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512305202825&di=c41657b2b8d6a08667f2fd1d7fdffa1a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01241058e5c591a801219c777e33f5.gif',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512305202825&di=c41657b2b8d6a08667f2fd1d7fdffa1a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01241058e5c591a801219c777e33f5.gif',
  attempt: 1
});
import store from './store';
//进入路由之前每一次都会执行此方法全局钩子
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title || "";
  next();
  //next({path:'list'})
});
import('swiper/dist/css/swiper.css');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store
})
