const axios = require('axios');
const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
    var token = req.headers.token;
    try{
        var decodedClaims
        try{
            decodedClaims = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        } catch(err){
            res.status(401).json("Invalid token or does not exist.");
            return;
        }
        var username = decodedClaims.username;

        let config = {
            headers: {
                token: token,
            }
        }

        axios.post(
            process.env.USERS_URL + "/verifyauth",
            {username: username},
            config
        ).then((response) => {
            next();
        }).catch((err)=>{
            res.status(err.response.status).json(err.response.data);
        });

    } catch(err){
        res.status(err.statusCode ?? 500).json({ message: err.message ?? 'An unexpected error has occurred. Please try again later.' });
        return;
    }
}

module.exports = {
    verifyAuth
}