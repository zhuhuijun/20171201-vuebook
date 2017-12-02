<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<style scoped lang="less">
  img{width: 100%;}
</style>

<script>
  export default {
    props:['swiperSlides'],
    name: 'carousel',
    data() {
      return {
        swiperOption: {
          autoplay: 1500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          observeParents: true,
        },
      }
    }
  }
</script>
