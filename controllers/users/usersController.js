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

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userAuth);
        res.json({
            data: user
        });
    } catch (error) {
        next(appError(error.message));
    }
};

const adminBlockUser = async (req, res, next) => {
    try {
        const userToBlock = await User.findById(req.params.id);

        if (userToBlock) {
            userToBlock.isBlocked = true;
            await userToBlock.save();

            res.json({
                data: 'You have blocked the user'
            });
        } else {
            return next(appError('User not found', 403));
        }
    } catch (error) {
        next(appError(error.message));
    }
};

const adminUnblockUser = async (req, res, next) => {
    try {
        const userToBlock = await User.findById(req.params.id);

        if (userToBlock) {
            userToBlock.isBlocked = false;
            await userToBlock.save();

            res.json({
                data: 'You have unblocked the user'
            });
        } else {
            return next(appError('User not found', 403));
        }
    } catch (error) {
        next(appError(error.message));
    }
};

const blockUser = async (req, res, next) => {
    try {
        const userToBlock = await User.findById(req.params.id);

        const userWhoBlocked = await User.findById(req.userAuth);

        if (userToBlock && userWhoBlocked) {
            const isUserAlreadyBlocked = userWhoBlocked.blocked.find(blocked => blocked.toString()
                === userToBlock._id.toString());
            
            if(isUserAlreadyBlocked) {
                return next(appError('User already blocked'));
            }

            userWhoBlocked.blocked.push(userToBlock._id);
            await userWhoBlocked.save();

            res.json({
                data: 'You have blocked the user'
            });
        }
    } catch (error) {
        // Send JSON response with error message
        next(appError(error.message));
    }
};

const unblockUser = async (req, res, next) => {
    try {
        const userBlocked = await User.findById(req.params.id);

        const userWhoBlocked = await User.findById(req.userAuth);

        if (userBlocked && userWhoBlocked) {
            const userNotBlocked = userWhoBlocked.blocked.find(blocked => blocked.toString() === userBlocked._id.toString());

            if (!userNotBlocked) {
                return next(appError('User is not blocked'));
            }

            userWhoBlocked.blocked = userWhoBlocked.blocked.filter(blocked => blocked.toString() === userBlocked._id);

            await userWhoBlocked.save();            

            res.json({
                data: 'You have unblocked the user'
            });
        }
    } catch (error) {
        // Send JSON response with error message
        next(appError(error.message));
    }
};

const whoViewedProfile = async (req, res, next) => {
    try {
        //user of profile being viewed
        const user = await User.findById(req.params.id);

        //user viewing profile
        const userWhoViewed = await User.findById(req.userAuth);

        if (!user) {
            return next(appError('User not found', 403));
        }

        if (!userWhoViewed) {
            return next(appError('User viewed not found', 403));
        }

        if (user && userWhoViewed) {
            //check if viewer has already viewed the profile
            const userAlreadyViewed = user.viewedBy.find(viewer => viewer.toString() === userWhoViewed._id.toString());

            if (userAlreadyViewed) {
                return next(appError('User already viewed profile', 403));
            } else {
                //add new viewer to user's viewers and save
                user.viewedBy.push(userWhoViewed._id);
                await user.save();

                res.json({
                    data: 'You have viewed this profile.'
                });
            }
        }
    } catch (error) {
        next(appError(error.message));
    }
}

const followUser = async (req, res, next) => {
    try {
        //user to follow
        const user = await User.findById(req.params.id);

        //user following
        const userWhoFollowed = await User.findById(req.userAuth);

        if (!user) {
            return next(appError('User to follow not found', 403));
        }

        if (!userWhoFollowed) {
            return next(appError('User following not found', 403));
        }

        if (user && userWhoFollowed) {
            //check if user is already following
            const userAlreadyFollowing = user.followers.find(follower => follower.toString() === userWhoFollowed._id.toString());

            if (userAlreadyFollowing) {
                return next(appError('User already followed', 403));
            } else {
                //add new follower to user's followers
                user.followers.push(userWhoFollowed._id);

                //add user to following user's f0ollowed list
                userWhoFollowed.following.push(user._id);

                await user.save();
                await userWhoFollowed.save();

                res.json({
                    data: 'You have followed this user'
                });
            }
        }
    } catch (error) {
        next(appError(error.message));
    }
};

const unfollowUser = async (req, res, next) => {
    try {
        //user to unfollow
        const user = await User.findById(req.params.id);

        //user unfollowing
        const userWhoUnFollowed = await User.findById(req.userAuth);

        if (!user) {
            return next(appError('User to unfollow not found', 403));
        }

        if (!userWhoUnFollowed) {
            return next(appError('User unfollowing not found', 403));
        }

        if (user && userWhoUnFollowed) {
            //check if user is already following
            const userAlreadyFollowing = user.followers.find(follower => follower.toString() === userWhoUnFollowed._id.toString());

            if (!userAlreadyFollowing) {
                return next(appError('User is not followed', 403));
            } else {
                //add new follower to user's followers
                user.followers = user.followers.filter(follower => follower.toString() === userWhoUnFollowed._id);

                await user.save();

                //add user to following user's f0ollowed list
                userWhoUnFollowed.following = userWhoUnFollowed.following.filter(follower => follower.toString() === user._id);
                
                await userWhoUnFollowed.save();

                res.json({
                    data: 'You have unfollowed this user'
                });
            }
        }
    } catch (error) {
        next(appError(error.message));
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

const uploadProfilePhoto = async (req, res, next) => {
    console.log(req.file);
    try {
        //find the user to update
        const userToUpdate = await User.findById(req.userAuth);

        if (!userToUpdate) {
            return next(appError('User not found', 403));
        }

        if (userToUpdate.isBlocked) {
            return next(appError('The account is blocked', 403));
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
    adminBlockUser,
    adminUnblockUser,
    blockUser,
    unblockUser,
    whoViewedProfile,
    followUser,
    unfollowUser,
    getAllUsers,
    deleteUser,
    updateUser,
    uploadProfilePhoto
};