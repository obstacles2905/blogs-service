import request from 'supertest';
import app from "../index";

describe(`functional tests`, () => {
    it('should correctly return users from external api', async() => {
        const response = await request().get('/articles/userArticles?userId=1');

        expect(response.text).not.toBeNull();
    })
})


/** tests types
 * 1. unit tests - test local isolated functions or mocked functions, usually they don't bootstrap server
 * 2. functional tests - test more business or infrastrucgure oriented functionality, with usage of external services, like 3rd party api or database, example - application should successfully start, should accept post query and return some result
 * 3. end-to-end - test complete business flow, like: user can register, can login, can create article, some other user can like this article
 */
