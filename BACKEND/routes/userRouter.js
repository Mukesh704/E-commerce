const express = require('express');
const router = express.Router();

const { getUserProfileController, updateUserProfileController, getOrdersController, getWishListController } = require('../controllers/userController');

router.get('/me', getUserProfileController);
router.put('/me', updateUserProfileController);
router.get('/orders', getOrdersController)
router.get('/wishlist', getWishListController);

module.exports = router;