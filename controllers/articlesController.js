const {Article, User} = require("../models/models");
async function getUserArticles(userId) {
    try {
        const userExists = await User.findOne({where: {id: userId}});
        if (!userExists) {
            console.warn(`User with id ${userId} doesn't exist`);
            return;
        }

        return await Article.findAll({userId});
    } catch(err) {
        throw new Error(`Error while getUserArticles: ${err.message}`)
    }
}

module.exports = { getUserArticles }
