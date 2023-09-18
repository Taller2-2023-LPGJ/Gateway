const { Router } = require('express');
const proxy = require('express-http-proxy');
const verifyToken = require('./tokenMiddleware');

const router = Router();
const profileRoute = proxy(process.env.PROFILE_URL);

router.use('/', (req, res, next) => {
    try{
        verifyToken(req.headers.token);
    } catch(err){
        res.status(err.statusCode).json({ message: err.message });
    }

    next();
}, profileRoute);

module.exports = router;
