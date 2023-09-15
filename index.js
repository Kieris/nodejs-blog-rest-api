const express = require('express');
const userRouter = require('./routes/users/userRoutes');
const postsRouter = require('./routes/posts/postsRoutes');
const commentsRouter = require('./routes/comments/commentsRoutes');
const categoriesRouter = require('./routes/categories/categoriesRoutes');
const gbErrorHandler = require('./utils/gbErrorHandler');

require('dotenv').config();
require("./config/dbConnect")
const app = express();

//--------Middleware---------
app.use(express.json());//pass incoming payload to req.body

//---Routes---
//User routes
app.use('/api/v1/users', userRouter);

//Posts routes
app.use('/api/v1/posts', postsRouter);

//Comments routes
app.use('/api/v1/comments', commentsRouter);

//Categories routes
app.use('/api/v1/categories', categoriesRouter);


//-----Error handlers------
app.use(gbErrorHandler);

//404 error
app.use('*', (req, res) => {
    res.status(404).json({
        status: "failed",
        message: `${req.originalUrl} Route not found`
    });
});

//Listen to server
const PORT = process.env.PORT || 8083;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));