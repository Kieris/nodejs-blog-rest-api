const getTokenFromHeader = require('../utils/getTokenFromHeader');
const verifyToken = require('../utils/verifyToken');
const { appError } = require('../utils/appError');
const User = require('../model/User/User');

const isAdmin = async (req, res, next) => {
    //get token
    const token = getTokenFromHeader(req);
    
    //verify token
    const decodedUser = verifyToken(token);

    //save user in req object
    req.userAuth = decodedUser.id;

    if (!decodedUser) {
        //not authorized
        return next(appError("Invalid token. Please login.", 401));
    }

    const user = await User.findById(decodedUser.id);

    if(user?.isAdmin) {
        next();
    } else {
        return next(appError("You are not authorized to access this route.", 403));
    }   
}

module.exports = isAdmin;