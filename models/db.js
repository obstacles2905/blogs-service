const { Client } = require('pg');
const dotenv = require("dotenv");
dotenv.config();

const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    db: process.env.POSTGRES_DB,
};
console.log("CONFIG", config)
const client = new Client(config);
client.connect();

module.exports = { client };
