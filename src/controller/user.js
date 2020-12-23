const { exec, escape } = require("../db/mysql");
const { generatePassword } = require("../utils/encode");

const login = (username, password) => {
    username = escape(username);
    password = generatePassword(password);
    password = escape(password);
    const sql = `select username, realname from users 
    where username=${username} and pwd=${password}`;
    return exec(sql).then((rows) => {
        return rows[0] || {};
    });
};

module.exports = {
    login,
};
