const express = require('express')

const commentsRouter = express.Router();

//POST/api/v1/comments
commentsRouter.post('/', async (req, res) => {
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
commentsRouter.get('/:id', async (req, res) => {
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
commentsRouter.delete('/:id', async (req, res) => {
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
commentsRouter.put('/:id', async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update comment route'
        })
    } catch (error) {
        res.json(error.message)
    }
});

module.exports = commentsRouter;