const { loginCheck } = require('../controller/user');
const { SuccessModel, ErroModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  // 登陆
  if (req.method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginCheck(username, password);
    if (result) {
      return new SuccessModel('登陆成功');
    }
    return new ErroModel('登陆失败');
  }
};

module.exports = handleUserRouter;
