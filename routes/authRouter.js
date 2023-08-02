const express = require('express');
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post('/login', async (request, response, next) => {
    const { login, password } = request.body;
    if (!login || !password) {
        return response.status(401).send('Login or password are not passed');
    }

    if (request.session[login]) {
        return response.status(200).send('You are already logined');
    }

    const isSuccessfulLogin = await authController.login(login, password);
    if (isSuccessfulLogin) {
        request.session[login] = true;

        return response.status(200).send('Login successful');
    } else {
        return response.status(403).send('Login failed, please check your login/password');
    }
})

authRouter.post('/logout', async (request, response, next) => {
    const { login } = request.body;

    if (!login) {
        return response.status(401).send('Login is not passed');
    }

    request.session[login] = undefined;

    return response.status(200).send('Logout successful');
})

authRouter.post('/register', async (request, response, next) => {

})

module.exports = { authRouter };
