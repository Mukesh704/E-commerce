const express = require('express');
const router = express.Router();

const { allCateogiesController, addCatogriesController } = require('../controllers/catogriesController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')

router.get('/', jwtAuthMiddleware, allCateogiesController);
router.post('/', jwtAdminMiddleware, addCatogriesController);

module.exports = router;