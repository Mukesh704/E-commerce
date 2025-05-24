const express = require('express');
const router = express.Router();

const { getAllOrdersController, updateOrderStatusController } = require('../controllers/adminOrderController');

router.get('/', getAllOrdersController);
router.put('/:id', updateOrderStatusController);

module.exports = router;