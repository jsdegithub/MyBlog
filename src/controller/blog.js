const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
    var sql = `select * from blogs where state=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;
    return exec(sql);
};

const getDetail = (id) => {
    return {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1608207320114,
        author: "jinshuo",
    };
};

const newBlog = (blogData = {}) => {
    return {
        id: 3,
    };
};

const updateBlog = (id, blogData = {}) => {
    return true;
};

const delBlog = (id, blogData = {}) => {
    return true;
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
};
