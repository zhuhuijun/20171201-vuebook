<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Swiper :swiperSlides="slidersdata"></Swiper>
      <div class="container">
        <h3>热门图书</h3>
        <ul>
          <li v-for="hot in hootBook">
            <img :src="hot.bookCover" alt="">
            <b>{{hot.title}}</b>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<style scoped lang="less">
  h3{color:#999;padding: 5px 0;}
  .container {
    width: 90%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      li {
        text-align: center;
        width: 50%;
        margin: 5px 0;
        img{width: 100%;}
      }
    }
  }
</style>

<script>
  import MHeader from '@/base/MHeader.vue';
  import Swiper from '@/base/Swiper.vue';
  import {getSliders, getHotBook} from '../api';

  export default {
    created() {
      this.getServerSliders();
      this.getServerHot();
    },
    data() {
      return {
        slidersdata: [],
        hootBook: []
      }
    },
    components: {
      MHeader,
      Swiper
    },
    methods: {
      /**
       * 轮播图的获得
       * @returns {Promise.<void>}
       */
      async getServerSliders() {
        //data别名
        let {data: slidersdata} = await getSliders();
        this.slidersdata = slidersdata;
      },
      async getServerHot() {
        //data别名
        let {data: hootBook} = await getHotBook();
        this.hootBook = hootBook;
      }
    }
  }
</script>
