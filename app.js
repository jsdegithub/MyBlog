const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const serverHandler = (req, res) => {
    res.setHeader("Content-type", "application/json");
    const url = req.url;
    const path = url.split("?")[0];
    req.path = path;
    req.query = querystring.parse(url.split("?")[1]);
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData));
        return;
    }
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(JSON.stringify(userData));
        return;
    }
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
};
module.exports = serverHandler;
