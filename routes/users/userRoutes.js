const express = require('express')
const { registerUser, loginUser, getUser, getAllUsers, deleteUser, updateUser } = require('../../controllers/users/usersController');
const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post('/register', registerUser);

//POST/api/v1/users/login
userRouter.post('/login', loginUser);

//GET/api/v1/users/profile/:id
userRouter.get('/profile/:id', getUser);

//GET/api/v1/users
userRouter.get('/', getAllUsers);

//DELETE/api/v1/users/:id
userRouter.delete('/:id', deleteUser);

//PUT/api/v1/users/:id
userRouter.put('/:id', updateUser);


module.exports = userRouter;