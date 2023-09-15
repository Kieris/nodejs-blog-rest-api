const express = require('express')

const postsRouter = express.Router();

//POST/api/v1/posts
postsRouter.post('/', async (req, res) => {
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
postsRouter.get('/:id', async (req, res) => {
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
postsRouter.get('/', async (req, res) => {
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
postsRouter.delete('/:id', async (req, res) => {
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
postsRouter.put('/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update post route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

module.exports = postsRouter;