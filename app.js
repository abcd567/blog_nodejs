const querystring = require('querystring');
const handleBlogRouter = require('./src/route/blog');
const handleUserRouter = require('./src/route/user');
const { maxAge } = require('./src/config/cookieConfig');

// 全局 session数据
const SESSION_DATA = {};

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

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.replace('; ', ';').split(';').forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    // 去掉空格，不然要用 [" username"]方式获取值
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  // 如果是post,解析postdata
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogdata) => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; max-age=${maxAge}; httpOnly`);
        }
        res.end(
          JSON.stringify(blogdata),
        );
      });
      return;
    }


    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; max-age=${maxAge}; httpOnly`);
        }
        res.end(
          JSON.stringify(userData),
        );
      });
      return;
    }

    // 未命中路由，404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 not found</h1>');
  });
};

module.exports = serverHandle;
