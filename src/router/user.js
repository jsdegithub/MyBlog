const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
    const method = req.method;
    if (method === "POST" && req.path === "/api/user/login") {
        const username = req.body["username"];
        const password = req.body["password"];
        return login(username, password).then((data) => {
            if (data.username) {
                return new SuccessModel("登录成功");
            } else {
                return new ErrorModel("登陆失败");
            }
        });
    }
};

module.exports = handleUserRouter;
