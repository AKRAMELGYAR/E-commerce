const express = require('express');
const productController = require('../controllers/productController')
const router = express.Router();

router.route('/')
            .get(productController.getAllProducts)
            .post(productController.addProduct)

router.route('/statistics')
            .get(productController.statistics)            

router.route('/:id')
            .get(productController.getSingleProduct)
            .patch(productController.updateProduct)
            .delete(productController.DeleteProduct)


module.exports = router;