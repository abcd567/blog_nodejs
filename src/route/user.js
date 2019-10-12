const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {
  // 登陆
  if (req.method === 'POST' && req.path === '/api/user/login') {
    let { username, password } = req.body;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;
        set(req.sessionId, req.session);
        return new SuccessModel('登陆成功');
      }
      return new ErrorModel('登陆失败');
    });
  }

  // 验证登陆测试
  // if (req.method === 'GET' && req.path === '/api/user/login_test') {
  //  // 如果组装cookie时不去掉空格，就必须用req.cookie[" username"]才取得到值
  //  // const username = req.cookie.username
  //  if (req.session.username) {
  //    return Promise.resolve(new SuccessModel({ session: req.session }, '登陆成功'));
  //  }
  //  return Promise.resolve(new ErrorModel('未登录'));
  // }
};

module.exports = handleUserRouter;
