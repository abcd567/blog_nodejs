const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');


const handleUserRouter = (req, res) => {
  // 登陆
  if (req.method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // 操作 cookie
        const maxAge = 30 * 60 * 1000;
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; max-age=${maxAge}; httpOnly`);
        return new SuccessModel('登陆成功');
      }
      return new ErrorModel('登陆失败');
    });
  }

  // 验证登陆测试
  if (req.method === 'GET' && req.path === '/api/user/login_test') {
    // 如果组装cookie时不去掉空格，就必须用req.cookie[" username"]才取得到值
    const username = req.cookie.username
    if (username) {
      return Promise.resolve(new SuccessModel('登陆成功'));
    }
    return Promise.resolve(new ErrorModel('登陆失败'));
  }
};

module.exports = handleUserRouter;
