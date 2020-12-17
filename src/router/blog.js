const { getList, getDetail } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
    const method = req.method;
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id;
        const detail = getDetail(id);
        return new SuccessModel(detail);
    }
    if (method === "GET" && req.path === "/api/blog/new") {
        return {
            msg: "这是新建博客的接口",
        };
    }
    if (method === "GET" && req.path === "/api/blog/update") {
        return {
            msg: "这是更新博客的接口",
        };
    }
    if (method === "GET" && req.path === "/api/blog/del") {
        return {
            msg: "这是删除博客的接口",
        };
    }
};

module.exports = handleBlogRouter;
