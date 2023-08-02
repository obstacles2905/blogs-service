const { client } = require("../models/db");

async function login(login, password) {
    const userExists = await client.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
    return userExists.rows.length !== 0;
}

module.exports = { login }


