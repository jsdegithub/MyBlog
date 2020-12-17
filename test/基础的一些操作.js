const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    const query = querystring.parse(url.split("?")[1]); //是一个对象
    console.log(query);
    res.setHeader("Content-type", "application/json");
    const resData = {
        method,
        url,
        path,
        query,
    };
    if (method === "GET") {
        res.end(JSON.stringify(resData));
    }
    if (method === "POST") {
        var postData = "";
        req.on("data", (data) => {
            postData += data.toString();
        });
        req.on("end", (_) => {
            resData.postData = postData;
            res.end(JSON.stringify(resData));
        });
    }
});

server.listen(8000);
