import {Article, User} from "../models/models";

export async function getUserArticles(userId: number) {
    try {
        const userExists = await User.findOne({where: {id: userId}});
        if (!userExists) {
            console.warn(`User with id ${userId} doesn't exist`);
            return;
        }

        return await Article.findAll({
            where: {
                userId
            }
        });
    } catch(err: any) {
        throw new Error(`Error while getUserArticles: ${err.message}`)
    }
}
