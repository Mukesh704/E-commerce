const express = require('express');
const router = express.Router();

const { createOrderController, getOrderController, markOrderPaidController, addToWishlistController } = require('../controllers/orderController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.put('/wishlist', jwtAuthMiddleware, addToWishlistController);
router.post('/', jwtAuthMiddleware, createOrderController);
router.get('/:id', jwtAuthMiddleware, getOrderController);
router.put('/:id', jwtAuthMiddleware, markOrderPaidController);

module.exports = router;