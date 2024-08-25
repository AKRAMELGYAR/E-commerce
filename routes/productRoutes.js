const express = require('express');
const productController = require('../controllers/productController')
const router = express.Router()
const {redisCacheMiddleware} = require('../middleware/redis');
const verifyToken = require('../middleware/verifyToken');
const { verifyRole } = require('../controllers/authControllers');

router.route('/')
            .get(redisCacheMiddleware(),productController.getAllProducts)
            .post(verifyToken,verifyRole("seller","admin"),productController.addProduct)

router.route('/statistics')
            .get(productController.statistics)            

router.route('/:id')
            .get(redisCacheMiddleware(3600),productController.getSingleProduct)
            .patch(verifyToken,verifyRole("seller","admin"),productController.updateProduct)
            .delete(verifyToken,verifyRole("seller","admin"),productController.DeleteProduct)


module.exports = router;