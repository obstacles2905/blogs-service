import express from "express";

export const usersRouter = express.Router();

usersRouter.get('/users', async (request, response, next) => {
})

usersRouter.post('/users', async (request, response, next) => {
    console.log("REQUEST", request.body);
})

usersRouter.put('/users', async (request, response, next) => {
})
