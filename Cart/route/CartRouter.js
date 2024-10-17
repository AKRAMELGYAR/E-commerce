const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController')
const verifyToken = require('../../middleware/verifyToken')
router.route('/')
            .get(verifyToken , cartController.getcart)
            .post(verifyToken , cartController.addToCart)
router.route('/:productId')
            .patch(verifyToken,cartController.updeteQuantity)
            .delete(verifyToken,cartController.removeitem)


module.exports = router