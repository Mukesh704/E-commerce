const express = require('express');
const router = express.Router();

const { createOrderController, getOrderController, markOrderPaidController, addToWishlisttroller } = require('../controllers/orderController');

router.post('/', createOrderController);
router.get('/:id', getOrderController);
router.put('/:id', markOrderPaidController);
router.put('/wishlist', addToWishlisttroller);

module.exports = router;