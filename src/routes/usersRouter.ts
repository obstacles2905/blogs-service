import express from "express";
import {getUsers} from "../controllers/usersController";

export const usersRouter = express.Router();

usersRouter.get('/users', async (request, response, next) => {
    const users = await getUsers();
    response.json(users);
})

usersRouter.post('/users', async (request, response, next) => {
    console.log("REQUEST", request.body);
})

usersRouter.put('/users', async (request, response, next) => {
})
