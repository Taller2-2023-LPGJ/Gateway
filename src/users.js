const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.use('/', async (req, res) => {
    console.log(req.method);
    console.log(process.env.USERS_URL);
    console.log(req.path);
    console.log(process.env.USERS_URL + req.path);

    try{
        const response = await axios({
            method: req.method,
            url: process.env.USERS_URL + req.path,
            data: req.method != 'GET' ? req.body : {},
        });

        res.status(response.status).json(response.data);
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'An unexpected error has occurred. Please try again later.' });
    }
});

module.exports = router;
