const express = require('express');
const router = express.Router();

const { createProductController, updateProductController, deleteProductController } = require('../controllers/adminProductsController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.post('/', jwtAuthMiddleware, createProductController);
router.put('/:id', jwtAuthMiddleware, updateProductController);
router.delete('/:id', jwtAuthMiddleware, deleteProductController)

module.exports = router;