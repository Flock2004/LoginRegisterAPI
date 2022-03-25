const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userController = require('../controllers/users')

router.get('/register', userController.registerView)
router.post('/register', userController.registerUser)

router.get('/login', userController.loginView)
router.post('/login', userController.loginUser)

router.get('/users', auth, userController.getAllUsers)

module.exports = router;
