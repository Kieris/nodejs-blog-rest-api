const express = require('express')
const { createComment, getComment, deleteComment, updateComment } = require('../../controllers/comments/commentsController');
const commentsRouter = express.Router();

//POST/api/v1/comments
commentsRouter.post('/', createComment);

//GET/api/v1/comments/:id
commentsRouter.get('/:id', getComment);

//DELETE/api/v1/comments/:id
commentsRouter.delete('/:id', deleteComment);

//PUT/api/v1/comments/:id
commentsRouter.put('/:id', updateComment);

module.exports = commentsRouter;