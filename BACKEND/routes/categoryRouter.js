const express = require('express');
const router = express.Router();

const { allCategoriesController, addCategoriesController } = require('../controllers/catogriesController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.get('/', jwtAuthMiddleware, allCategoriesController);
router.post('/', jwtAdminMiddleware, addCategoriesController);

module.exports = router;