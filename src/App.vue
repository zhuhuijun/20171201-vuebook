<template>
  <div id="app">
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>

    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';

  export default {
    name: 'app',
    components: {
      Tab
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input, button {
    -web-kit-appearance: none
  }

  .content {
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 50px;
    overflow: auto;
  }

  .fadeIn-enter {
    opacity: 0;

  }

  .fadeIn-enter-active {
    transition: all 0.8s linear;
  }

  .fadeIn-leave-active {
    transition: all 0.8s linear;
    opacity: 0;
  }
</style>
