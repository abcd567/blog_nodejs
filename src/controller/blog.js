const { exec, escape } = require('../db/mysql');

const getList = (author, keyword) => {
  /* 获取数据库博客列表 */
  //keyword = escape(`%${keyword}%`);

  let sql = 'select * from blogs where 1=1 ';
  if (author) {
    author = escape(author);
    sql += `and author=${author} `;
  }
  if (keyword) {
    keyword = escape(`%${keyword}%`);
    sql += `and title like ${ keyword } `;
  }
  sql += 'order by ctime desc;';
  //console.log(sql);
  return exec(sql);
};


const getDetail = (id) => {
  id = escape(id);
  const sql = `select * from blogs where id=${id};`;
  return exec(sql).then((rows) => rows[0]);
};


const newBlog = (blogdata) => {
  /* blogdata 是个博客对象， 包含title， content ctime等属性 */
  const { title, content, author } = blogdata;
  const ctime = Date.now();
  title = escape(title);
  content = escape(content);
  author = escape(author);

  const sql = `
      insert into blogs (title, content, author, ctime)
      values (${title}, ${content}, ${author}, ${ctime});
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
  title = escape(title);
  content = escape(content);
  author = escape(author);
  id = escape(id);

  const sql = `
    update blogs set title=${title}, content=${content} where id=${id} and author=${author};
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
  author = escape(author);
  id = escape(id);

  const sql = `
    delete from blogs where id=${id} and author=${author};
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
