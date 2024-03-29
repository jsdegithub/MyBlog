const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel("尚未登陆"));
    }
};

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    if (method === "GET" && req.path === "/api/blog/list") {
        var author = req.query.author || "";
        var keyword = req.query.keyword || "";
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            author = req.session.username;  //强制访问自己的博客列表
        }
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
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        req.body.author = req.session.username;
        return newBlog(req.body).then((res) => {
            return new SuccessModel(res);
        });
    }
    if (method === "POST" && req.path === "/api/blog/update") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        return updateBlog(id, req.body).then((res) => {
            if (res) {
                return new SuccessModel("更新成功");
            } else {
                return new ErrorModel("更新失败");
            }
        });
    }
    if (method === "POST" && req.path === "/api/blog/del") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        const author = req.session.username;
        return delBlog(id, author).then((res) => {
            if (res) {
                return new SuccessModel("删除成功");
            } else {
                return new ErrorModel("删除失败");
            }
        });
    }
};

module.exports = handleBlogRouter;
