const User = require('../../model/User/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const { AppError, appError } = require('../../utils/appError');

const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, profilePhoto, password } = req.body;

        const userFound = await User.findOne({ email });

        //Check if email exists
        if (userFound) {
            return next(new AppError("User already exists", 504));
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        res.json({
            data: user
        });
    } catch (error) {
        next(new AppError(error.message));
    }
};

/**
 * Logs in a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if email exists
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.json({
                msg: "Email or password is incorrect.",
            });
        }

        //Verify password
        const isPasswordMatched = await bcrypt.compare(password, userFound.password);

        if (!isPasswordMatched) {
            return res.json({
                msg: "Email or password is incorrect.",
            });
        }

        // Send a JSON response with a success status and a message
        res.json({
            data: {
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id),
            }
        });
    } catch (error) {
        // Send a JSON response with the error message
        res.json(error.message);
    }
};

/**
 * Get user profile
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userAuth);
        // Send JSON response with success status and data
        res.json({
            data: user
        });
    } catch (error) {
        // Send JSON response with error message
        res.json(error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'users route'
        });
    } catch (error) {
        res.json(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'delete user route'
        });
    } catch (error) {
        res.json(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        res.json({
            status: success,
            data: 'update user route'
        });
    } catch (error) {
        res.json(error.message);
    }
};

const uploadProfilePhoto = async (req, res) => {
    console.log(req.file);
    try {
        //find the user to update
        const userToUpdate = await User.findById(req.userAuth);

        if (!userToUpdate) {
            return next(appErr('User not found', 403));
        }

        if (userToUpdate.isBlocked) {
            return next(appErr('The account is blocked', 403));
        }

        if (req.file) {
            await User.findByIdAndUpdate(
                req.userAuth,
                {
                    $set: {
                        profilePhoto: req.file.path
                    },
                },
                {
                    new: true
                }
            );
        
            res.json({
                data: 'You have successfully updated your profile photo'
            });
        }

    } catch (error) {
        next(appError(error.message));
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    uploadProfilePhoto
};