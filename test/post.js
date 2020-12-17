const http = require("http");

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        var postData = "";
        req.on("data", (chunk) => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            console.log("postData:", postData);
            res.end(postData);
        });
    }
});

server.listen(8000);
