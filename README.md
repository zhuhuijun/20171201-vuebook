# bookstore

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
## 路由元信息
- this.$route.meta.keepAlive
## 下拉加载 /page
- 默认每次5条,前端告诉后台现在从第几条开始
- /page?offset=5
- 告诉前端是否有更多 hasMore:true
## coding split

