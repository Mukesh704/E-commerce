const express = require('express');
const router = express.Router();

const { registerController, loginController, forgotPasswordController, resetPasswordController } = require('../controllers/authController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', jwtAuthMiddleware, resetPasswordController);

module.exports = router;