const request = require('supertest');
const app = require("../index");

describe('articles controller', () => {
    it('Should correctly return user articles', async () => {
        const userId = 1;

        const response = await request(app)
            .get(`/articles?userId=${userId}`);
        const articles = JSON.parse(response.text);

        expect(articles.length).toBeGreaterThan(0);
        expect(articles.every(article => article.userId === userId)).toBeTruthy();
    })
})
