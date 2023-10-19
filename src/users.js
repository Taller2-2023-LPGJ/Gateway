const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.use('/', (req, res) => {
    axios({
        method: req.method,
        url: process.env.USERS_URL + req.path,
        data: req.method != 'GET' ? req.body : {},
        params: req.query,
        headers: {
            'token': req.headers ? req.headers.token : null
        }
    }).then((response) => {
        console.log();
        res.status(response.status).json(response.data);
    }).catch((err)=>{
        console.log(err);
        res.status(err.response.status).json(err.response.data);
    });
});

module.exports = router;
