let http = require('http');
let fs = require('fs');
let url = require('url');
let path  =require('path');
//读文件
function read(callback) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  })
}

function write(books, callback) {
  fs.writeFile('./book.json', JSON.stringify(books), callback);
}

let pageSize = 5;//每页的数据
//获取轮播图 /sliders
let sliders = require('./sliders');
let mymime = require('./mymime');

http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") return res.end();


  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/sliders') {
    res.setHeader('Content-Type', "application/json;charset=utf8");
    return res.end(JSON.stringify(sliders));
  }
  if (pathname === '/hot') {
    read(function (books) {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-Type', "application/json;charset=utf8");
      setTimeout(() => {
        return res.end(JSON.stringify(hot));
      }, 1000);
    });
    return;
  }
  /**
   * 热门图书的方法
   */
  if (pathname === '/book') {
    let id = parseInt(query.id);

    switch (req.method) {
      case "GET":
        if (!isNaN(id)) {
          read(function (books) {
            var one = books.find(item => item.bookId == id);
            if (!one) one = {};
            res.setHeader('Content-Type', "application/json;charset=utf8");
            return res.end(JSON.stringify(one));
          })
        } else {
          read(function (books) {
            let hot = books.reverse();
            res.setHeader('Content-Type', "application/json;charset=utf8");
            return res.end(JSON.stringify(hot));
          });
        }
        break;
      case "POST":
        let str = '';
        req.on('data', chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let booknew1 = JSON.parse(str);
          read(function (books) {
            booknew1.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
            books.push(booknew1);
            //重新写回数据
            write(books, function () {
              return res.end(JSON.stringify(booknew1));
            });
          });
        });
        break;
      case "PUT":
        if (id) {
          let str = '';
          req.on('data', chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let booknew = JSON.parse(str);
            read(function (books) {
              //读取替换
              books = books.map(item => {
                if (item.bookId === id) {
                  return booknew;
                }
                return item;
              });
              //重新写回数据
              write(books, function () {
                return res.end(JSON.stringify(booknew));
              })
            });
          });

        }
        break;
      case "DELETE":
        read(function (books) {
          books = books.filter(item => item.bookId != id);
          //console.info(books);
          write(books, function () {
            return res.end(JSON.stringify({}));//删除返回空对象
          });
        });
        break;
    }
    return;
  }
  /**
   * 分页的数据
   */
  if (pathname === '/page') {

    let offset = parseInt(query.offset) || 0;
    //console.log(offset);
    read(function (books) {
      let ret = books.reverse().slice(offset, pageSize + offset);
      let hasMore = true;
      if (books.length < offset + pageSize) {
        hasMore = false;
      }
      res.setHeader('Content-Type', "application/json;charset=utf8");
      return res.end(JSON.stringify({hasMore: hasMore, books: ret}));
    })
    return;
  }



  fs.stat('.' + pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      //res.setHeader('Content-Type', "text/html;charset=utf8");
      if (stats.isDirectory()) {
        let p = require('path').join('.' + pathname, './index.html');
        res.writeHead(200, {                     //响应客户端，将文件内容发回去
          'Content-type': 'text/html'
        });    //通过后缀名指定mime类型
        fs.createReadStream(p).pipe(res);

      } else {
        //如果是目录会报错
        let pp = '.' + pathname;
        console.info("pp=%s", pp);
        var ext = path.extname(pp);
        ext = ext?ext.slice(1) : 'unknown';
        var contentType = mymime[ext] || "text/plain";
        res.writeHead(200, {                     //响应客户端，将文件内容发回去
          'Content-type': contentType
        });
        console.info(contentType);
        fs.createReadStream('.' + pathname).pipe(res);
      }

    }
  })
}).listen(4000);
