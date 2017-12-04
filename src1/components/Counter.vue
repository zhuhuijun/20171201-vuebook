<template>
  <div class="content">
    计数器:
    <button @click="dec">-</button>
    <br>
    当前:{{count}} 结果:{{myCount}}
    <br>
    计数器:
    <button @click="add" >+</button>
  </div>
</template>
<style scoped>
  .content {
    font-size: 30px;
  }
</style>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import * as Types from '../store/types';

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState(["count"]),
      ...mapGetters(["myCount"]),
    },
    components: {},
    methods: {
      ...mapActions([Types.INCREMENT, Types.DECREMENT]),
      add() {
        this[Types.INCREMENT](1);
      },
      dec() {
        this[Types.DECREMENT](1);
      },
    }
  }
</script>
