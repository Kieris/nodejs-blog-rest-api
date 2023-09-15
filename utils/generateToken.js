const jwt = require('jsonwebtoken');
require('dotenv');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;