const express = require('express');
const router = express.Router();

const { allCateogiesController, addCatogriesController } = require('../controllers/catogriesController');

router.get('/', allCateogiesController);
router.post('/', addCatogriesController);

module.exports = router;