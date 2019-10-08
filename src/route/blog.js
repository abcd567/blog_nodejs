const {
  getList, getDetail, newBlog, updateBlog, delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const id = req.query.id || '';

  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
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

    req.body.author = 'zhangsan'; // 涉及登陆权限验证，暂时使用假数据
    const result = newBlog(req.body);
    return result.then((data) => new SuccessModel(data, '博客新建成功'));
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    req.body.author = 'zhangsan'; // 涉及登陆权限验证，暂时使用假数据
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
    req.body.author = 'zhangsan'; // 涉及登陆权限验证，暂时使用假数据
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
