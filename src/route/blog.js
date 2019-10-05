const { getList, getDetail } = require('../controller/blog');
const { SuccessModel, ErroModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id || '';
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  // 新建一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是 新建博客 接口',
    };
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '这是 更新博客 接口',
    };
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是 删除博客 接口',
    };
  }
};


module.exports = handleBlogRouter;
