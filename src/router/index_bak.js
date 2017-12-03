import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home.vue';
import List from '../components/List.vue';
import Add from '../components/Add.vue';
import Collect from '../components/Collect.vue';
import Detail from '../components/Detail.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home', component: Home,meta:{keepAlive:true}},
    {path: '/list', component: List},
    {path: '/collect', component: Collect},
    {path: '/detail/:bid', component: Detail,name:'detail'},
    {path: '/add', component: Add},
    // {path: '/', component: Home}
     {path: '/', redirect: '/home'}
     //this.$route.meta.keepAlive
  ]
})
