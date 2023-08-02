const express = require('express');
const {getUserArticles} = require("../controllers/articlesController");

const articlesRouter = express.Router();

articlesRouter.get('/:userId', async (request, response, next) => {
    const { userId } = request.params;

    const userArticles = await getUserArticles(userId);
    return response.status(200).send(userArticles.rows);
})

module.exports = { articlesRouter };
