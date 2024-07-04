const express = require('express');
const userController = require('../controllers/userController');

router = express.Router();

// login
router.post('/login', userController.loginUser);

// sign up
router.post('/signup', userController.signupUser);

module.exports = router;