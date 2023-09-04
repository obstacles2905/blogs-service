import {Article, User} from "../models/models";

export async function getUserArticles(userId: any) {
    try {
        const userExists = await User.findOne({where: {id: userId}});
        if (!userExists) {
            console.warn(`User with id ${userId} doesn't exist`);
            return;
        }

        return await Article.findAll({
            where: {
                id: userId
            }
        });
    } catch(err: any) {
        throw new Error(`Error while getUserArticles: ${err.message}`)
    }
}
