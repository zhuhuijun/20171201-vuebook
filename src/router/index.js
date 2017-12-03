import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
      meta: {keepAlive: true,title:'首页'}
    },
    {
      path: '/list',
      component: () => import('../components/List.vue'),
      meta:{title:'列表'}
    },
    {
      path: '/collect',
      component: () => import('../components/Collect.vue'),
      meta:{title:'收藏'}
    },
    {
      path: '/detail/:bid',
      component: () => import('../components/Detail.vue'),
      name: 'detail',
      meta:{title:'详情'}
    },
    {
      path: '/add',
      component: () => import('../components/Add.vue'),
      meta:{title:'添加'}
    },
    // {path: '/', component: Home}
    {
      path: '/',
      redirect: '/home'
    }
    //this.$route.meta.keepAlive
  ]
})
