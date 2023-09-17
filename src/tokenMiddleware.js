const jwt = require('jsonwebtoken');
const Exception = require('./exception');
const secretKey = env("TOKEN_SECRET_KEY");
const milisecondsInThreeHours = 1000 * 60 * 60 * 3;

function verifyToken(token, requestUser){
    try {
        const {user, iat} = jwt.verify(token, secretKey);

        if(user != requestUser || Math.floor(Date.now() / 1000) >= iat + milisecondsInThreeHours){
            throw new Error('');
        }
    } catch (err) {
        throw new Exception('Your session has expired. Please sign in again.', 401);
    }
}

module.exports = verifyToken;
