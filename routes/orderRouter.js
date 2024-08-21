const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

const orderControllers = require('../controllers/orderControllers')


router.route('/')
            .get(verifyToken,orderControllers.creatOrder)


module.exports = router