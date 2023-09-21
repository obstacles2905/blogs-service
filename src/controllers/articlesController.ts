import {Article, User} from "../models/models";
import {MongoClient} from "mongodb";

const client = new MongoClient('mongodb+srv://pismennikita:admin@cluster0.ughvtsl.mongodb.net/?retryWrites=true&w=majority');

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
export async function getArticlesFromMongo() {
    try {
        await client.connect()
            .catch(err => {
                console.log("err", err);
            })
        const db = await client.db('blogs-service');
        const articlesCollection = await db.collection('blogs');

        const newArticle = {
            title: 'some title',
            content: 'content2',
            likes: 0
        }

        await articlesCollection.insertOne(newArticle);

        const articles = await articlesCollection.findOne({content: 'content2'});
        return articles;
    } catch(err: any) {
        throw new Error(`Error while getArticlesFromMongo ${err.message}`);
    }
}
