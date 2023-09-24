const { Router } = require('express');
const axios = require('axios');
const verifyToken = require('./tokenMiddleware');

const router = Router();

router.use('/', async (req, res) => {
    try{
        const username = verifyToken(req.headers.token);

        const response = await axios({
            method: req.method,
            url: process.env.PROFILE_URL + req.path,
            data: req.method != 'GET' ? {...req.body, username: username} : {},
            params: req.query,
        });

        res.status(response.status).json(response.data);
    } catch(err){
        res.status(err.statusCode ?? 500).json({ message: err.message ?? 'An unexpected error has occurred. Please try again later.' });
    }
});

module.exports = router;
