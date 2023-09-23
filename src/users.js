const { Router } = require('express');
const proxy = require('express-http-proxy');

const router = Router();
const userRoute = proxy(process.env.USERS_URL/*, {
    onProxyRes: async (proxyRes, req, res) => {
        if(proxyRes.statusCode === 200 && req.path === '/signup' && req.method === 'POST'){
            const { username } = req.body;
            
            const profileRes = await axios.post(process.env.PROFILE_URL + '?username=' + username);

            if(profileRes.statusCode !== 200){
                res.status(profileRes.statusCode).json({ message: profileRes.message });
                return;
            }         
        }

        res.status(proxyRes.statusCode).json({ message: proxyRes.message });
    }
}*/);

router.use('/', userRoute);

module.exports = router;
