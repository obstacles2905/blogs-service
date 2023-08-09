const bcrypt = require('bcrypt');
const { client } = require("../models/db");

const SALT_ROUNDS = 10;

async function login(login, password) {
    const userExists = await client.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
    return userExists.rows.length !== 0;
}

async function register({name, login, password}) {
    const userExists = await client.query(`SELECT * FROM users WHERE login = '${login}'`);
    if (userExists.rows.length !== 0) {
        return false;
    }

    const salt = bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await client.query(`INSERT INTO users (name, login, password) VALUES (${name}, ${login}, ${hashedPassword}`);
    } catch(err) {
        throw new Error(`Error while register: ${err.message}`);
    }
    return true;
}

module.exports = { login, register};


