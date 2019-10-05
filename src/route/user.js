const handleUserRouter = (req, res) => {
  // 登陆
  if (req.method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是 登陆 接口',
    };
  }
};

module.exports = handleUserRouter;
