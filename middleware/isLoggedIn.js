const getTokenFromHeader = require('../utils/getTokenFromHeader');
const verifyToken = require('../utils/verifyToken');
const { appError } = require('../utils/appError');

const isLoggedIn = (req, res, next) => {
    //get token
    const token = getTokenFromHeader(req);
    
    //verify token
    const decodedUser = verifyToken(token);

    //save user in req object
    req.userAuth = decodedUser.id;

    if (!decodedUser) {
        //not authorized
        return next(appError("Invalid token. Please login.", 401));
    } else {
        next();
    }

   

}

module.exports = isLoggedIn;