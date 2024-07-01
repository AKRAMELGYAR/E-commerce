const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.route('/:userId')
            .get(cartController.getcart)
            .post(cartController.addToCart)
router.route('/:userId/:productId')
            .patch(cartController.updeteQuantity)
            .delete(cartController.removeitem)


module.exports = router