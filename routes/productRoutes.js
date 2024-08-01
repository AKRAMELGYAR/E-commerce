const express = require('express');
const productController = require('../controllers/productController')
const router = express.Router()
const {redisCacheMiddleware} = require('../middleware/redis')

router.route('/')
            .get(redisCacheMiddleware(),productController.getAllProducts)
            .post(productController.addProduct)

router.route('/statistics')
            .get(productController.statistics)            

router.route('/:id')
            .get(redisCacheMiddleware(3600),productController.getSingleProduct)
            .patch(productController.updateProduct)
            .delete(productController.DeleteProduct)


module.exports = router;