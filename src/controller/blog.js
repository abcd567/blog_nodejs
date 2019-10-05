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


module.exports = {
  getList,
  getDetail,
};
