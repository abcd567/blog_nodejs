const querystring = require('querystring');
const handleBlogRouter = require('./src/route/blog');
const handleUserRouter = require('./src/route/user');


const serverHandle = (req, res) => {
  req.path = req.url.split('?')[0];

  res.setHeader('Content-Type', 'application/json');

  // 解析query
  req.query = querystring.parse(req.url.split('?')[1]);

  // 处理blog路由
  const blogData = handleBlogRouter(req, res);

  if (blogData) {
    res.end(
      JSON.stringify(blogData),
    );
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
};

module.exports = serverHandle;
