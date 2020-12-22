const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
    const method = req.method;
    // 设置cookie过期时间
    const getCookieExpires = () => {
        var days = 7;
        var d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        return d.toGMTString();
    };
    if (method === "POST" && req.path === "/api/user/login") {
        const username = req.body["username"];
        const password = req.body["password"];
        return login(username, password).then((data) => {
            if (data.username) {
                res.setHeader(
                    "Set-Cookie",
                    `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
                );
                return new SuccessModel("登录成功");
            } else {
                return new ErrorModel("登陆失败");
            }
        });
    }

    // 测试cookie
    if (method === "GET" && req.path === "/api/user/login") {
        const { username, password } = req.query;
        return login(username, password).then((data) => {
            if (data.username) {
                res.setHeader(
                    "Set-Cookie",
                    `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
                );
                return new SuccessModel("登录成功");
            } else {
                return new ErrorModel("登陆失败");
            }
        });
    }

    // 登录验证测试路由
    if (method === "GET" && req.path === "/api/user/login-test") {
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.cookie.username,
                })
            );
        } else {
            return Promise.resolve(new ErrorModel("尚未登陆"));
        }
    }
};

module.exports = handleUserRouter;
