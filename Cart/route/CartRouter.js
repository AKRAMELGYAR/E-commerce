const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController')
const verifyToken = require('../../middleware/verifyToken')
router.route('/')
            .get(verifyToken , cartController.getcart)
            .post(verifyToken , cartController.addToCart)
router.route('/:productId')
            .patch(cartController.updeteQuantity)
            .delete(cartController.removeitem)


module.exports = router