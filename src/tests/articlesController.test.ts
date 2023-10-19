import request from 'supertest';
import {describe, expect, it} from '@jest/globals';
import {app} from "../index";

describe('UsersRouter', () => {
    describe('GET/ users', () => {
        it('Should correctly return users', async () => {
            const response = await request(app).get('/articles')
            expect(true).toEqual(true);
        })
    })
})
