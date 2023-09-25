const { Router } = require('express');
const axios = require('axios');
const verifyToken = require('./tokenMiddleware');

const router = Router();

router.use('/', (req, res) => {
    try{
        var username = verifyToken(req.headers.token);
    } catch(err){
        res.status(err.statusCode ?? 500).json({ message: err.message ?? 'An unexpected error has occurred. Please try again later.' });
        return ;
    }
    axios({
        method: req.method,
        url: process.env.PROFILE_URL + req.path,
        data: req.method != 'GET' ? {...req.body, username: username} : {},
        params: req.query,
    }).then((response) => {
        res.status(response.status).json(response.data);
    }).catch((err)=>{
        console.log(err);
        res.status(err.response.status).json(err.response.data);
    });
});

module.exports = router;
