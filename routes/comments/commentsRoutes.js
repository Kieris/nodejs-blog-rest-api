const express = require('express')
const { createComment, getComment, deleteComment, updateComment } = require('../../controllers/comments/commentsController');
const commentsRouter = express.Router();
const isLoggedIn = require('../../middleware/isLoggedIn');

//POST/api/v1/comments/:id
commentsRouter.post('/:id', isLoggedIn, createComment);

//GET/api/v1/comments/:id
commentsRouter.get('/:id', isLoggedIn, getComment);

//DELETE/api/v1/comments/:id
commentsRouter.delete('/:id', isLoggedIn, deleteComment);

//PUT/api/v1/comments/:id
commentsRouter.put('/:id', isLoggedIn, updateComment);

module.exports = commentsRouter;