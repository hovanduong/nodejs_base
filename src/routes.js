const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController');
const userMiddleware = require('./middlewares/auth/authencation_middleware');
const adminMiddleware = require('./middlewares/auth/authorization_middlewares');

const middleware={
    user:userMiddleware,
    user1:adminMiddleware
}
router.get('/',[middleware.user1] ,(req, res) => {
    return res.json({
        warn: "me",
    })
});

router.post('/user', UserController.create);
router.post('/auth',UserController.login);

module.exports = router;