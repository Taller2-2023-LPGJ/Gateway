const { Router } = require('express');
const proxy = require('express-http-proxy');

const router = Router();
const userRoute = proxy(process.env.USERS_URL);

router.use('/', userRoute);

module.exports = router;
