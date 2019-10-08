const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  /* 获取数据库博客列表 */
  let sql = 'select * from blogs where 1=1 ';
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by ctime desc;';
  return exec(sql);
};


const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}';`;
  return exec(sql).then((rows) => rows[0]);
};


const newBlog = (blogdata) => {
  /* blogdata 是个博客对象， 包含title， content ctime等属性 */
  const { title, content, author } = blogdata;
  const ctime = Date.now();

  const sql = `
      insert into blogs (title, content, author, ctime)
      values ('${title}', '${content}', '${author}', '${ctime}');
  `;
  return exec(sql).then((insertData) =>
    // console.log('insertData is :\n', insertData);
    ({
      id: insertData.insertId,
    }));
};

const updateBlog = (id, blogdata) => {
  /*
   * id 是更新博客的id
   * blogdata 是个博客对象， 包含title， content ctime等属性 */
  const { title, content, author } = blogdata;

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id} and author='${author}';
  `;

  return exec(sql).then((updateData) => {
    // console.log('update data is : \n', updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const delBlog = (id, blogdata) => {
  /* id: 要删除的博客的id */
  const { author } = blogdata;
  const sql = `
    delete from blogs where id=${id} and author='${author}';
  `;
  return exec(sql).then((delData) => {
    // console.log('delData data is : \n', delData);
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
