const {
  getList, getDetail, newBlog, updateBlog, delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const loginCheck = (req) => {
  /* 统一登陆验证，有效返回未定义 */
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登陆'));
  }
};


const handleBlogRouter = (req, res) => {
  const id = req.query.id || '';

  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }
      // 强制查询自己的博客
      author = req.session.username;
    }

    const result = getList(author, keyword);

    return result.then((listdata) => {
      if (listdata.length) {
        return new SuccessModel(listdata);
      }
      return new ErrorModel('无结果');
    });
  }

  // 获取博客详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id);
    // return new SuccessModel(data);
    const result = getDetail(id);
    return result.then((data) => {
      if (data) {
        return new SuccessModel(data);
      }
      return new ErrorModel('博客id不存在');
    });
  }

  // 新建一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body);
    // return new SuccessModel(data, '博客新建成功');

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then((data) => new SuccessModel(data, '博客新建成功'));
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;

    const result = updateBlog(id, req.body);
    return result.then((retVal) => {
      if (retVal) {
        return new SuccessModel('博客更新成功');
      }
      return new ErrorModel('博客更新失败');
    });
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;

    const result = delBlog(id, req.body);
    return result.then((retVal) => {
      if (retVal) {
        return new SuccessModel('博客删除成功');
      }
      return new ErrorModel('博客删除失败');
    });
  }
};


module.exports = handleBlogRouter;
