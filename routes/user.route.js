const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { registerAuth, loginAuth } = require('../middle/auth');

router.get('/register', userController.registerPage);
router.post('/register', registerAuth, userController.register);

router.get('/login', userController.loginPage);
router.post('/login', loginAuth, userController.login);

module.exports = router;
