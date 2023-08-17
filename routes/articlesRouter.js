const express = require('express');
const { getUserArticles } = require("../controllers/articlesController");
const { param, query, validationResult } = require("express-validator");

const articlesRouter = express.Router();

articlesRouter.get('/',
    query("userId", 'User id should be provided').isNumeric(),
    async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { userId } = request.query;

    const userArticles = await getUserArticles(userId);
    return response.status(200).send(userArticles);
})

module.exports = { articlesRouter };
