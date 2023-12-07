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

    axios({
        method: req.method,
        url: process.env.USERS_URL + req.path,
        data: req.method != 'GET' ? body : {},
        params: req.method == 'GET' ? query : {},
    }).then((response) => {
        res.status(response.status).json(response.data);
    }).catch((err)=>{
        res.status(err.response.status).json(err.response.data);
    });
});

module.exports = router;
