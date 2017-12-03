<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
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
      </template>
    </div>
  </div>
</template>
<style scoped lang="less">
  h3 {
    color: #999;
    padding: 5px 0;
  }

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
        img {
          width: 100%;
        }
      }
    }
  }
</style>

<script>
  import MHeader from '@/base/MHeader.vue';
  import Swiper from '@/base/Swiper.vue';
  import {getAll} from '../api';
  import Loading from '../base/Loading.vue';
  export default {
    created() {
      this.getAllData();
    },
    data() {
      return {
        slidersdata: [],
        hootBook: [],
        loading: true
      }
    },
    components: {
      MHeader,
      Swiper,Loading
    },
    methods: {
      async getAllData() {
        let [{data: slidersdata}, {data: hootBook}] = await getAll();
        this.slidersdata = slidersdata;
        this.hootBook = hootBook;
        this.loading = false;
      }
    }
  }
</script>
