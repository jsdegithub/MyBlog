const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getCookieExpires = () => {
    var days = 7;
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    return d.toGMTString();
};

const SESSION_DATA = {};

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({});
            return;
        }
        if (req.headers["content-type"] !== "application/json") {
            resolve({});
            return;
        }
        var postData = "";
        req.on("data", (chunk) => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            if (!postData) {
                resolve({});
            } else {
                resolve(JSON.parse(postData));
            }
        });
    });
};

const serverHandler = (req, res) => {
    res.setHeader("Content-type", "application/json");
    const url = req.url;
    const path = url.split("?")[0];
    req.path = path;
    req.query = querystring.parse(url.split("?")[1]);

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || "";
    cookieStr.split("; ").forEach((item) => {
        if (!item) {
            return;
        }
        var tempArr = item.split("=");
        req.cookie[tempArr[0]] = tempArr[1];
    });

    // 解析session
    var userId = req.cookie.userid;
    var needSetCookie = false;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    //利用全局变量记录session，再次发起url请求时，全局变量
    //SESSION_DATA不会丢失，它记录着当前的登陆状态
    req.session = SESSION_DATA[userId];

    getPostData(req).then((postData) => {
        req.body = postData;
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then((blogData) => {
                if (needSetCookie) {
                    res.setHeader(
                        "Set-Cookie",
                        `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
                    );
                }
                res.end(JSON.stringify(blogData));
            });
            return;
        }
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then((userData) => {
                if (needSetCookie) {
                    res.setHeader(
                        "Set-Cookie",
                        `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
                    );
                }
                res.end(JSON.stringify(userData));
            });
            return;
        }
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("404 Not Found\n");
        res.end();
    });
};
module.exports = serverHandler;
