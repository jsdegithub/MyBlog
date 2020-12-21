const env = process.env.NODE_ENV;

var MYSQL_CONF;
if (env === "dev") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "myblog",
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
}

module.exports = {
    MYSQL_CONF,
};
