const express = require('express');
const router = express.Router();

const { createProductController, updateProductController, deleteProductController } = require('../controllers/adminProductsController');

router.get('/', createProductController);
router.put('/:id', updateProductController);
router.get('/:id', deleteProductController)

module.exports = router;