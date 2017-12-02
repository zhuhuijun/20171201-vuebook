import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";
/***
 * 过滤器
 */
axios.interceptors.response.use((res) => {
  return res;
}, function (error) {
  return Promise.reject(error);
});
//获取轮播图数据,返回promise对象
export let getSliders = () => {
  return axios.get('/sliders');
};
/**
 * 获得热门图书
 * @returns {*}
 */
export let getHotBook = () => {
  return axios.get('/hot');
};

export let getBooks = () => {
  return axios.get('/book');
};
/**
 * 获得一本书
 * @param bid
 * @returns {*}
 */
export let getOneBook = (id) => {
  return axios.get(`/book?id=${id}`);
};
/**
 * 删除书本
 * @param id
 * @returns {*}
 */
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`);
};
/**
 * 修改图书
 * @param id
 * @param data
 * @returns {*}
 */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
}
/**
 * 添加
 * @param data
 * @returns {*}
 */
export let addBook=(data)=>{
  return axios.post("/book", data);
}
