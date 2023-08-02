const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/users', async (request, response, next) => {

})

usersRouter.post('/users', async (request, response, next) => {

})

usersRouter.put('/users', async (request, response, next) => {

})

module.exports = { usersRouter };
