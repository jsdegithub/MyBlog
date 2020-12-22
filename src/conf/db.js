const env = process.env.NODE_ENV;

var MYSQL_CONF;
var REDIS_CONF;

if (env === "dev") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "myblog",
    };
    REDIS_CONF = {
        host: "127.0.0.1",
        port: 6379,
    };
}
if (env === "prod") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "myblog",
    };
    REDIS_CONF = {
        host: "127.0.0.1",
        port: 6379,
    };
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
};
