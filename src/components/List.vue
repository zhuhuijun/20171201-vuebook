<template>
  <div>
    <MHeader :back="true">图书列表</MHeader>
    <div class="content" ref="scroll" @scroll="loadmoreScroll">
      <ul>
        <router-link v-for="(book,index) in books"
                     :to="{name:'detail',params:{bid:book.bookId}}"
                     :key="index" tag="li">
          <img v-lazy="book.bookCover" alt="">
          <div class="right">
            <h4>{{book.title}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <div class="btnlist">
              <button type="button" @click.stop="remove(book.bookId)">删除</button>
              <button type="button" @click.stop="addCart(book)">添加</button>
            </div>

          </div>
        </router-link>
      </ul>
      <div @click="loadmore" class="more">加载更多</div>
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
    width: 60px;
    height: 25px;
    outline: none;
    background: orangered;
    color: #fff;
    border: none;
    border-radius: 15px;
    margin-left: 5px;
  }

  .more {
    text-align: center;
    height: 40px;
    margin: 10px;
    background: green;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    display: none;
  }

  .btnlist {
    display: flex;
    justify-content: space-around;
  }
</style>

<script>
  import MHeader from '../base/MHeader.vue';
  import {getBooks, removeBook, pageData} from '../api';
  import * as Types from '../store/types';
  import {mapState, mapActions} from 'vuex';

  export default {
    created() {
      //this.getServerBooks();
      this.getServerPage();
    },
    data() {
      return {
        books: [],
        offset: 0,
        hasMore: true,
        isLoading: false
      }
    },
    components: {
      MHeader
    },
    mounted() {
      let scroll = this.$refs.scroll;
      let top = scroll.offsetTop;
      let distance = 0;
      let moved = false;
      scroll.addEventListener('touchstart', (e) => {
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
        let start = e.touches[0].pageY;
        console.info("start=%d", start);//手指点击开始
        let move = (e) => {
          moved = true;
          let current = e.touches[0].pageY;
          distance = current - start;
          //负数不要
          console.info("distance:%d", distance);
          if (distance > 0) {
            if (distance <= 50) {
              scroll.style.top = top + distance + 'px';
            } else {
              scroll.style.top = (top + 50) + 'px';
              distance = 50;
            }

          } else {
            try {
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              return;
            } catch (ex) {
              console.error(ex);
              return;
            }

          }
        };
        let end = () => {
          if (!moved) return;
          moved = false;
          clearInterval(this.tt);
          this.tt = setInterval(() => {
            if (distance <= 0) {
              clearInterval(this.tt);
              distance = 0;
              scroll.style.top = top + 'px';
              //获得数据
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              this.books = [];
              this.offset = 0;
              this.hasMore = true;
              this.getServerPage();
              return;
            }
            distance -= 1;
            scroll.style.top = top + distance + "px";
          }, 1);
        };
        scroll.addEventListener('touchmove', move);
        scroll.addEventListener('touchend', end);
      }, false);
    },
    methods: {
      ...mapActions([Types.ADD_CART]),
      async getServerBooks() {
        let {data: books} = await getBooks();
        this.books = books;
      },
      async remove(bookid) {
        await removeBook(bookid);
        //删除前台
        this.books = this.books.filter(item => item.bookId !== bookid);
      },
      async getServerPage() {
        if (this.hasMore && !this.isLoading) {
          this.isLoading = true;
          let {data: ret} = await pageData(this.offset);
          this.books = [...this.books, ...ret.books];
          this.hasMore = ret.hasMore;
          this.offset = this.books.length;
          this.isLoading = false;
        }

      },
      loadmore() {
        this.getServerPage();
      },
      loadmoreScroll() {
        //卷曲高度，当前可见高度，总高
        //截留
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          console.log(1000);
          if (scrollTop + clientHeight + 20 > scrollHeight) {
            this.getServerPage();
          }
        }, 100);
      },
      //添加购物车
      addCart(one) {
        this[Types.ADD_CART](one);
        //this.$store.commit(Types.ADD_CART,one);
      }
    }
  }
</script>
