const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.use('/', (req, res) => {

    axios({
        method: req.method,
        url: process.env.USERS_URL + req.path,
        data: req.method != 'GET' ? req.body : {},
    }).then((response) => {
        res.status(response.status).json(response.data);
    }).catch((err)=>{
        console.log(err);
        res.status(err.response.status).json(err.response.data);
    });
    
});

module.exports = router;
