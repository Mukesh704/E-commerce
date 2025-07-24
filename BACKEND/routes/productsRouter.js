const express = require('express');
const router = express.Router();

const { getProducts, getProductById, getBestSellingProducts } = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/bestsellers', getBestSellingProducts);

module.exports = router;