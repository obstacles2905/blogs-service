const express = require('express');
const authController = require("../controllers/authController");
const {body, validationResult} = require("express-validator");

const authRouter = express.Router();

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
    async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { login, password } = request.body;

    if (request.session[login] && request.session[login] === password) {
        return response.status(200).send('You are already logined');
    }

    const isSuccessfulLogin = await authController.login(login, password);
    if (isSuccessfulLogin) {
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

    request.session[login] = undefined;

    return response.status(200).send('Logout successful');
});

authRouter.post('/register/',
    body('login', 'Login param is missing').isString(),
    body('password', 'Password param is missing').isString(),
    async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }

    const { login, password, name } = request.body;

    const isSuccessfulRegister = await authController.register({login, password, name});
    if (isSuccessfulRegister) {
        request.session[login] = true;

        return response.status(200).send('Registration successful');
    } else {
        return response.status(403).send('Registration failed, please check your login/password');
    }
});

module.exports = { authRouter };
