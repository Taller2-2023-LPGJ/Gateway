const { Router } = require('express');
const proxy = require('express-http-proxy');

const router = Router();
const userRoute = proxy(env("USERS_URL"));

router.use('/', userRoute);

module.exports = router;
