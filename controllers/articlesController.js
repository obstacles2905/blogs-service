const {client} = require("../models/db");

async function getUserArticles(userId) {
    console.log("USERID", userId);
    const query = await client.query(`SELECT * from public.articles where user_id = ${userId}`);

    const queryInnerJoin = await client.query(`SELECT a.*, u.* from public.articles a inner join users u on "a".user_id = "u".id where "a".user_id = ${userId}`)
    console.log("QUERY", queryInnerJoin.rows);

    return query.rows;
}

module.exports = { getUserArticles }
