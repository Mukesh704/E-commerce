const express = require('express');
const router = express.Router();

const { getProducts, getProductById, getBestSellingProducts } = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/bestsellers', getBestSellingProducts);
router.get('/:id', getProductById);

module.exports = router;