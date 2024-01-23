const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router = express.Router()

//sign-up routes
router.post('/register', registerController);

//login routes
router.post('/login', loginController)

module.exports = router