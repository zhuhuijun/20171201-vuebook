<template>
  <div>
    <MHeader>购物车
      <ul class="content">
        <li v-for="one in cartList">
          <img :src="one.bookCover" alt="">
          <h3>{{one.title}}</h3>
          <button>-</button>
          {{one.bookCount}}
          <button>+</button>
          <button>删除</button>
        </li>
        <li>共{{myCount}}本</li>
      </ul>
    </MHeader>
  </div>
</template>
<style scoped>

</style>

<script>
  import MHeader from '../base/MHeader.vue';
  import {mapState,mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapState(["cartList"]),
      ...mapGetters(["myCount"])
    },
    data() {
      return {}
    },
    components: {MHeader},
    methods: {}
  }
</script>
