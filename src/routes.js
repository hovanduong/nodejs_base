const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController');

router.get('/', (req, res) => {
    return res.json({
        warn: "me",
    })
});

router.post('/user', UserController.create);
router.post('/auth',UserController.login);

module.exports = router;