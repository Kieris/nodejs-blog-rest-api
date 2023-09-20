const express = require('express')
const { createPost, getPost, getAllPosts, deletePost, updatePost } = require('../../controllers/posts/postsController');
const isLoggedIn = require('../../middleware/isLoggedIn');
const postsRouter = express.Router();

//POST/api/v1/posts
postsRouter.post('/', isLoggedIn, createPost);

//GET/api/v1/posts/:id
postsRouter.get('/:id', getPost);

//GET/api/v1/posts
postsRouter.get('/', getAllPosts);

//DELETE/api/v1/posts/:id
postsRouter.delete('/:id', deletePost);

//PUT/api/v1/posts/:id
postsRouter.put('/:id', updatePost);

module.exports = postsRouter;