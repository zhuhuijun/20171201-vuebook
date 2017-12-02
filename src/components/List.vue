<template>
  <div>
    <MHeader :back="true">图书列表</MHeader>
    <div class="content">
      <ul>
        <router-link v-for="(book,index) in books"
                     :to="{name:'detail',params:{bid:book.bookId}}"
                     :key="index" tag="li">
          <img :src="book.bookCover" alt="">
          <div class="right">
            <h4>{{book.title}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button type="button" @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .content ul li img {
    width: 122px;
    height: 150px;
  }

  .right {
    margin-left: 20px
  }

  .content h4 {
    font-size: 20px;
    line-height: 35px;
  }

  .content p {
    color: #2a2a2a;
    line-height: 25px;
  }

  .content b {
    color: red;
    line-height: 25px;
  }

  .content button {
    display: block;
    width: 70px;
    height: 25px;
    outline: none;
    background: orangered;
    color: #fff;
    border: none;
    border-radius: 15px;
  }
</style>

<script>
  import MHeader from '../base/MHeader.vue';
  import {getBooks, removeBook} from '../api';

  export default {
    created() {
      this.getServerBooks();
    },
    data() {
      return {
        books: []
      }
    },
    components: {
      MHeader
    },
    methods: {
      async getServerBooks() {
        let {data: books} = await getBooks();
        this.books = books;
      },
      async remove(bookid) {
        await removeBook(bookid);
        //删除前台
        this.books = this.books.filter(item => item.bookId !== bookid);
      }
    }
  }
</script>
