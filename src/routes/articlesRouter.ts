import express from "express";
import {query, validationResult} from "express-validator";
import {getUserArticles} from "../controllers/articlesController";

export const articlesRouter = express.Router();

articlesRouter.get('/',
    query("userId", 'User id should be provided').isNumeric(),
    async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { userId } = request.query as any;

    const userArticles = await getUserArticles(userId);
    return response.render('articles', {articles: userArticles});
})
