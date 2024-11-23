const express = require("express");
const app = express();

app.use(express.json());

const postRouter = require('./routes/post.route')

app.use('/post',postRouter)

app.listen(3000);
