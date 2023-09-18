const jwt = require('jsonwebtoken');
const Exception = require('./exception');
const secretKey = process.env.TOKEN_SECRET_KEY;
const secondsInThreeHours = 60 * 60 * 3;

function verifyToken(token){
    try {
        const {user, iat} = jwt.verify(token, secretKey);

        if(Math.floor(Date.now() / 1000) >= iat + secondsInThreeHours){
            throw new Error('');
        }

        return user;
    } catch (err) {
        throw new Exception('Your session has expired. Please sign in again.', 401);
    }
}

module.exports = verifyToken;
