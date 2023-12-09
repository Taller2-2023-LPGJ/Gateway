const { Router } = require('express');
const axios = require('axios');
const verifyToken = require('./middleware');

const router = Router();

router.use('/', async (req, res) => {
    try{
        var username = await verifyToken(req.headers.token);
    } catch(err){
        res.status(err.statusCode ?? 500).json({ message: err.message ?? 'An unexpected error has occurred. Please try again later.' });
        return;
    }

    try{
        const result = await axios({
            method: req.method,
            url: process.env.PROFILE_URL + req.path,
            data: req.method != 'GET' ? {...req.body, username: username} : {},
            params: req.method == 'GET' ? {...req.query, username: username} : req.query
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
