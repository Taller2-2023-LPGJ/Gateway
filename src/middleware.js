const jwt = require('jsonwebtoken');
const axios = require('axios');
const Exception = require('./exception');

async function verifyToken(token, key = process.env.TOKEN_SECRET_KEY){
    try{
        var {username} = jwt.verify(token, key, {ignoreExpiration: false, clockTimestamp: Math.floor(Date.now() / 1000)});
    } catch(_){
        throw new Exception('Your session has expired. Please sign in again.', 401);
    }

    try {
        const user = await axios.get(`${process.env.USERS_URL}/blocked?username=${username}`);

        if(user.data.blocked)
            throw new Exception('Your account has been blocked.', 403);
        
        return username;
    } catch (err) {
        throw err;
    }
}

module.exports = verifyToken;
