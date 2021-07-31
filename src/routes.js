const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController');
const userMiddleware = require('./middlewares/authencation_middleware');
const adminMiddleware = require('./middlewares/authorization_middlewares');

const middleware={
    user:userMiddleware,
    adminMiddleware:adminMiddleware
}
router.get('/',[middleware.adminMiddleware] ,(req, res) => {
    return res.json({
        warn: "me",
    })
});


router.post('/user', UserController.create);
router.post('/auth',UserController.login);

module.exports = router;