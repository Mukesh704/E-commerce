const express = require('express');
const router = express.Router();

const { registerController, loginController, forgotPasswordController, resetPasswordController } = require('../controllers/authController');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', resetPasswordController);

module.exports = router;