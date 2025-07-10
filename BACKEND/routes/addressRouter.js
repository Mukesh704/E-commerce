const express = require('express');
const router = express.Router();

const { jwtAuthMiddleware } = require('../middlewares/authMiddleware')
const { addAddress, updateAddress, removeAddress } = require('../controllers/addressController')

router.post('/', jwtAuthMiddleware, addAddress);
router.put('/:id', jwtAuthMiddleware, updateAddress);
router.delete('/:id', jwtAuthMiddleware, removeAddress);

module.exports = router;