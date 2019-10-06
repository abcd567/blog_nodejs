const getList = (author, keyword) =>
  // 先返回格式正确的假数据
  [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1570295160107,
      author: 'zhangsan',
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1570295229288,
      author: 'lisi',
    },
  ];


const getDetail = (id) =>
  // 先返回格式正确的假数据
  ({
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1570295160107,
    author: 'zhangsan',
  });

const newBlog = (blogdata) =>
  /* blogdata 是个博客对象， 包含title， content ctime等属性 */
  ({
    id: 3,
  });
const updateBlog = (id, blogdata) => {
  /*
   * id 是更新博客的id
   * blogdata 是个博客对象， 包含title， content ctime等属性 */
  if (!id) {
    return false;
  }
  return true;
};

const delBlog = (id) => {
  /* id: 要删除的博客的id */
  if (!id) {
    return false;
  }
  return true;
};


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
