import express, {Request, Response, NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {register} from "../controllers/authController";
import * as fs from "fs";


export const authRouter = express.Router();

/**
 * @param {number} login - some login
 * @param {string} password - some password
 * @return {string} A good string
 *
 * @async
 *
 */
authRouter.post('/login',
    body('login').isString(),
    body('password').isString(),
    async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { login, password } = request.body;

    //@ts-ignore
    if (request.session[login] && request.session[login] === password) {
        return response.status(200).send('You are already logined');
    }

    const isSuccessfulLogin = await login(login, password);
    if (isSuccessfulLogin) {
        //@ts-ignore
        request.session[login] = password;

        return response.status(200).send('Login successful');
    } else {
        return response.status(403).send('Login failed, please check your login/password');
    }
});

authRouter.post('/logout', async (request, response, next) => {
    const { login } = request.body;

    if (!login) {
        return response.status(401).send('Login is not passed');
    }

    //@ts-ignore
    request.session[login] = undefined;

    return response.status(200).send('Logout successful');
});

authRouter.post('/register/',
    body('login', 'Login param is missing').isString(),
    body('password', 'Password param is missing').isString(),
    async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { login, password, name } = request.body;

    const isSuccessfulRegister = await register({login, password, name});
    if (isSuccessfulRegister) {
        //@ts-ignore
        request.session[login] = true;

        return response.status(200).send('Registration successful');
    } else {
        return response.status(403).send('Registration failed, please check your login/password');
    }
});
