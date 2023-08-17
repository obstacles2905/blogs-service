const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const session = require('express-session');

const { authRouter } = require("./routes/authRouter");
const { articlesRouter } = require("./routes/articlesRouter");
const { commentsRouter } = require("./routes/commentsRouter");
const { usersRouter } = require("./routes/usersRouter");

dotenv.config();

const port = process.env.APPLICATION_PORT;

const app = express();

app.use(bodyParser());
app.use(session({
    name: 'blogsSession',
    secret: 'blogsSecret'
}))

app.use('/auth', authRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Application has successfully started on port ${port}`)
})

module.exports = app;
