const express = require('express');
const storage = require('../../config/cloudinary');
const { registerUser, loginUser, getUser, getAllUsers, deleteUser, updateUser, uploadProfilePhoto, whoViewedProfile, followUser, unfollowUser } = require('../../controllers/users/usersController');
//const isLoggedIn = require('../../middleware/isLoggedIn');
const multer = require('multer');
const userRouter = express.Router();
const isLoggedIn = require('../../middleware/isLoggedIn');


//instance of multer
const upload = multer({ storage });
//POST/api/v1/users/register
userRouter.post('/register', registerUser);

//POST/api/v1/users/login
userRouter.post('/login', loginUser);

//GET/api/v1/users/profile/:id
userRouter.get('/profile', isLoggedIn, getUser);

//GET/api/v1/profile-viewers/:id
userRouter.get('/profile-viewers/:id', isLoggedIn, whoViewedProfile);

//GET/api/v1/users
userRouter.get('/', getAllUsers);

//DELETE/api/v1/users/:id
userRouter.delete('/:id', deleteUser);

//PUT/api/v1/users/:id
userRouter.put('/:id', updateUser);

//POST/api/v1/users/uploadPhoto
userRouter.post('/uploadPhoto', isLoggedIn, upload.single('profile'), uploadProfilePhoto);

//GET/api/v1/users/follow/:id
userRouter.get('/follow/:id', isLoggedIn, followUser);

//GET/api/v1/users/unfollow/:id
userRouter.get('/unfollow/:id', isLoggedIn, unfollowUser);



module.exports = userRouter;