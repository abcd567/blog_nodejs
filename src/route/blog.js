const {
  getList, getDetail, newBlog, updateBlog, delBlog,
} = require('../controller/blog');
const { SuccessModel, ErroModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const id = req.query.id || '';

  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  // 新建一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body);
    return new SuccessModel(data, '博客新建成功');
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    if (result) {
      return new SuccessModel('博客更新成功');
    }
    return new ErroModel('博客更新失败');
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id);
    if (result) {
      return new SuccessModel('博客删除成功');
    }
    return new ErroModel('博客删除失败');
  }
};


module.exports = handleBlogRouter;
