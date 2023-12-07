const { Router } = require('express');
const axios = require('axios');
const verifyToken = require('./middleware');

const router = Router();

function requiresTokenValidation(path){
    return (
        !path.startsWith('/admins/signin') && (
            path.startsWith('/admins') ||
            path.startsWith('/token') ||
            path.startsWith('/users')
        )
    );
}

router.use('/', async (req, res) => {
    let username = null;
    let body = req.body;
    let query = req.query;

    if(requiresTokenValidation(req.path)){
        username = await verifyToken(req.headers.token);
        body.username = username;
        query.username = username;
    }

    try{
        const result = await axios({
            method: req.method,
            url: process.env.USERS_URL + req.path,
            data: req.method != 'GET' ? body : {},
            params: req.method == 'GET' ? query : {},
        });

        res.status(result.status).json(result.data);
    } catch(err){
        if(axios.isAxiosError(err))
            res.status(err.response.status).json(err.response.data);
        else
            res.status(err.statusCode ?? 500).json({ message: err.message ?? 'An unexpected error has occurred. Please try again later.' });
    };
});

module.exports = router;
