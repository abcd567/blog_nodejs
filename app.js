const querystring = require('querystring');
const handleBlogRouter = require('./src/route/blog');
const handleUserRouter = require('./src/route/user');

// 获取postdata
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    // 接受post数据
    let postdata = '';
    req.on('data', (chunk) => {
      postdata += chunk.toString();
    });
    req.on('end', () => {
      if (!postdata) {
        resolve({});
      } else {
        resolve(JSON.parse(postdata));
      }
    });
  });
  return promise;
};


const serverHandle = (req, res) => {
  req.path = req.url.split('?')[0];

  res.setHeader('Content-Type', 'application/json');

  // 解析query
  req.query = querystring.parse(req.url.split('?')[1]);

  // 如果是post,解析postdata
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogdata) => {
        res.end(
          JSON.stringify(blogdata),
        );
      });
      return;
    }


    // 处理user路由
    const userData = handleUserRouter(req, res);

    if (userData) {
      res.end(
        JSON.stringify(userData),
      );
      return;
    }

    // 未命中路由，404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 not found</h1>');
  });
};

module.exports = serverHandle;
