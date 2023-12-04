const jwt = require('jsonwebtoken');
const axios = require('axios');
const Exception = require('./exception');
const secretKey = process.env.TOKEN_SECRET_KEY;
const secondsInThreeHours = 60 * 60 * 3;

function verifyToken(token){
    try {
        const {username, iat} = jwt.verify(token, secretKey);
        
        if(Math.floor(Date.now() / 1000) >= iat + secondsInThreeHours)
            throw new Error('');

        const user = axios.get(`${process.env.USERS_URL}/blocked?username=${username}`);

        if(user.blocked)
            throw new Exception('Your account has been blocked.', 403);
        
        return username;
    } catch (err) {
        throw new Exception('Your session has expired. Please sign in again.', 401);
    }
}

module.exports = verifyToken;
