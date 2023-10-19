import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import {articlesRouter} from "./routes/articlesRouter";
import {commentsRouter} from "./routes/commentsRouter";
import {usersRouter} from "./routes/usersRouter";
import {authRouter} from "./routes/authRouter";
import {playgroundRouter} from "./routes/playgroundRouter";

dotenv.config();

//@ts-ignore
const port = process.env.APPLICATION_PORT;

export const app = express();

//@ts-ignore
app.use(express.json());

app.use(session({
    name: 'blogsSession',
    secret: 'blogsSecret'
}))
app.set('view engine', 'ejs');

app.use('/auth', authRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);
app.use('/playground', playgroundRouter);

app.listen(port, () => {
    console.log(`Application has successfully started on port ${port}`)
})
