const axios = require('axios');
const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
    let token = req.headers.token;
    try{
        let decodedClaims
        try{
            decodedClaims = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        } catch(err){
            res.status(401).json({message: "Invalid token or does not exist."});
            return;
        }
        let username = decodedClaims.username;

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
    }
}

module.exports = {
    verifyAuth
}