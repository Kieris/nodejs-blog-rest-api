const express = require('express');
const storage = require('../../config/cloudinary');
const { registerUser, loginUser, getUser, getAllUsers, deleteUser, updateUser, uploadProfilePhoto,
    whoViewedProfile, followUser, unfollowUser, blockUser, unblockUser, adminBlockUser, adminUnblockUser, updatePassword,
} = require('../../controllers/users/usersController');
//const isLoggedIn = require('../../middleware/isLoggedIn');
const multer = require('multer');
const userRouter = express.Router();
const isLoggedIn = require('../../middleware/isLoggedIn');
const isAdmin = require('../../middleware/isAdmin');


//instance of multer
const upload = multer({ storage });
//POST/api/v1/users/register
userRouter.post('/register', registerUser);

//POST/api/v1/users/login
userRouter.post('/login', loginUser);

//GET/api/v1/users/profile
userRouter.get('/profile', isLoggedIn, getUser);

//GET/api/v1/profile-viewers/:id
userRouter.get('/profile-viewers/:id', isLoggedIn, whoViewedProfile);

//GET/api/v1/users
userRouter.get('/', isAdmin, getAllUsers);

//DELETE/api/v1/users
userRouter.delete('/', isLoggedIn, deleteUser);

//PUT/api/v1/users
userRouter.put('/', isLoggedIn, updateUser);

//PUT/api/v1/users/pass
userRouter.put('/pass', isLoggedIn, updatePassword);

//POST/api/v1/users/uploadPhoto
userRouter.post('/uploadPhoto', isLoggedIn, upload.single('profile'), uploadProfilePhoto);

//GET/api/v1/users/follow/:id
userRouter.get('/follow/:id', isLoggedIn, followUser);

//GET/api/v1/users/unfollow/:id
userRouter.get('/unfollow/:id', isLoggedIn, unfollowUser);

//PUT/api/v1/users/adminblock/:id
userRouter.put('/adminblock/:id', isLoggedIn, isAdmin, adminBlockUser);

//PUT/api/v1/users/adminunblock/:id
userRouter.put('/adminunblock/:id', isLoggedIn, isAdmin, adminUnblockUser);

//GET/api/v1/users/block/:id
userRouter.get('/block/:id', isLoggedIn, blockUser);

//GET/api/v1/users/unblock/:id
userRouter.get('/unblock/:id', isLoggedIn, unblockUser);



module.exports = userRouter;