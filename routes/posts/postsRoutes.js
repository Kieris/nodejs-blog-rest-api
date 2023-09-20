const express = require('express');
const storage = require('../../config/cloudinary');
const { createPost, getPost, getAllPosts, deletePost, updatePost,
    getFollowedPosts, toggleLike, toggleDislike } = require('../../controllers/posts/postsController');
const isLoggedIn = require('../../middleware/isLoggedIn');
const postsRouter = express.Router();
const multer = require('multer');

//instance of multer
const upload = multer({ storage });

//POST/api/v1/posts
postsRouter.post('/', isLoggedIn, upload.single("image"), createPost);

//GET/api/v1/posts/post/:id
postsRouter.get('/post/:id', isLoggedIn, getPost);

//GET/api/v1/posts
postsRouter.get('/', isLoggedIn, getAllPosts);

//GET/api/v1/posts/followed
postsRouter.get('/followed', isLoggedIn, getFollowedPosts);

//DELETE/api/v1/posts/:id
postsRouter.delete('/:id', isLoggedIn, deletePost);

//PUT/api/v1/posts/:id
postsRouter.put('/:id', isLoggedIn, upload.single("image"), updatePost);

//GET/api/v1/toggle-like/:id
postsRouter.get('/toggle-like/:id', isLoggedIn, toggleLike);

//GET/api/v1/toggle-dislike/:id
postsRouter.get('/toggle-dislike/:id', isLoggedIn, toggleDislike);

module.exports = postsRouter;