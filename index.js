const express = require('express');

require('dotenv').config();
require("./config/dbConnect")
const app = express();

//Middleware

//Routes

//User routes
//POST/api/v1/users/register
app.post('/api/v1/users/register', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'User registered'
        })
        return res;
    } catch (error) {
        res.json(error.message)
    }
});

//POST/api/v1/users/login
app.post('/api/v1/users/login', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'User logged in'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/users/profile/:id
app.get('/api/v1/users/profile/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'profile route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/users
app.get('/api/v1/users', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'users route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//DELETE/api/v1/users/:id
app.delete('/api/v1/users/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete user route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//PUT/api/v1/users/:id
app.put('/api/v1/users/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update user route'
        })
    } catch (error) {
        res.json(error.message)
    }
});


//Posts routes
//POST/api/v1/posts
app.post('/api/v1/posts', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'Post created'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/posts/:id
app.get('/api/v1/posts/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'get post by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/posts
app.get('/api/v1/posts', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'get all posts route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//DELETE/api/v1/posts/:id
app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete post route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//PUT/api/v1/posts/:id
app.put('/api/v1/posts/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update post route'
        })
    } catch (error) {
        res.json(error.message)
    }
});


//Comments routes
//POST/api/v1/comments
app.post('/api/v1/comments', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'Comment created'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/comments/:id
app.get('/api/v1/comments/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'get comments by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//DELETE/api/v1/comments/:id
app.delete('/api/v1/comments/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete comment route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//PUT/api/v1/comments/:id
app.put('/api/v1/comments/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update comment route'
        })
    } catch (error) {
        res.json(error.message)
    }
});


//Categories routes
//POST/api/v1/categories
app.post('/api/v1/categories', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'category created'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//GET/api/v1/categories/:id
app.get('/api/v1/categories/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'get category by id route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//DELETE/api/v1/categories/:id
app.delete('/api/v1/categories/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete category route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

//PUT/api/v1/categories/:id
app.put('/api/v1/categories/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update category route'
        })
    } catch (error) {
        res.json(error.message)
    }
});


//Error handlers

//Listen to server
const PORT = process.env.PORT || 8083;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));