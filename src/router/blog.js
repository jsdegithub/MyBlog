const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
        return getList(author, keyword)
            .then((res) => {
                return new SuccessModel(res);
            })
            .catch((err) => {
                return new ErrorModel(err);
            });
    }
    if (method === "GET" && req.path === "/api/blog/detail") {
        return getDetail(id).then((detail) => {
            return new SuccessModel(detail);
        });
    }
    if (method === "POST" && req.path === "/api/blog/new") {
        req.body.author = "jinshuo";
        return newBlog(req.body).then((res) => {
            return new SuccessModel(res);
        });
    }
    if (method === "POST" && req.path === "/api/blog/update") {
        const res = updateBlog(id, req.body);
        if (res) {
            return new SuccessModel("更新博客成功");
        } else {
            return new ErrorModel("更新博客失败");
        }
    }
    if (method === "POST" && req.path === "/api/blog/del") {
        const res = delBlog(id);
        if (res) {
            return new SuccessModel("删除博客成功");
        } else {
            return new ErrorModel("删除博客失败");
        }
    }
};

module.exports = handleBlogRouter;
