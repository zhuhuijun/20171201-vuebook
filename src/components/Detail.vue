<template>
  <div class="detail">
    <MHeader :back="true">详情页</MHeader>

    <ul>
      <li>
        <label for="title">标题</label>
        <input type="text" id="title" v-model="book.title">
      </li>
      <li>
        <label for="bookInfo">描述</label>
        <input type="text" id="bookInfo" v-model="book.bookInfo">
      </li>
      <li>
        <label for="bookPrice">价格</label>
        <input type="text" id="bookPrice" v-model.number="book.bookPrice">
      </li>
      <li>
        <button type="button" @click="update">确认修改</button>
      </li>
    </ul>

  </div>
</template>
<style scoped lang="less">
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    li {
      height: 70px;
      margin: 10px 0;
      label {
        display: block;
        font-size: 20px;
        height: 25px;
        line-height: 25px;
        font-weight: bold;
      }
      input {
        border: 1px solid gray;
        margin: 10px 0;
        height: 30px;
        width: 100%;
        outline: none;
        font-size: 20px;
      }
      button {
        display: block;
        width: 100%;
        height: 35px;
        outline: none;
        background: #2aabd2;
        color: #fff;
        border: none;
        font-size: 20px;
        border-radius: 5px;
      }
    }
  }

  ul {
    margin: 40px 20px 0 20px;
  }
</style>

<script>
  import MHeader from '../base/MHeader';
  import {getOneBook, updateBook} from '../api'

  export default {
    data() {
      return {
        book: {}
      }
    },
    watch: {
      $route() {
        this.getServerOneBook();
      }
    },
    created() {
      this.getServerOneBook();
    },
    computed: {
      bid() {
        return this.$route.params.bid;
      }
    },
    components: {
      MHeader
    },
    methods: {
      async getServerOneBook() {
        let {data: book} = await getOneBook(this.bid);
        this.book = book;
        //如果是空对象回到列表页
        Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list');
      },
      async update() {
        await updateBook(this.bid, this.book);
        this.$router.push('/list');
      }
    }
  }
</script>
