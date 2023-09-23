const { Router } = require('express');
const verifyToken = require('./tokenMiddleware');

const router = Router();

router.use('/', async (req, res, next) => {
    try{
        const username = verifyToken(req.headers.token);

        await axios({
            method: req.method,
            url: process.env.PROFILE_URL,
            data: {username: username},
        });

        await axios.get(process.env.PROFILE_URL, {username: username});

        next();
    } catch(err){
        res.status(err.statusCode).json({ message: err.message });
    }
});

module.exports = router;
