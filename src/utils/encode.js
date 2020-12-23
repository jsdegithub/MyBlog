const crypto = require("crypto");

const SECRET_KEY = "secretkey";

function md5(content) {
    var md5 = crypto.createHash("md5");
    return md5.update(content).digest("hex");
}

function generatePassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    generatePassword,
};
