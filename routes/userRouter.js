const express = require('express')
const router = express.Router();
const userController = require('../controllers/authControllers')
const verifyToken = require('../middleware/verifyToken')

router.route('/')
            .get(verifyToken,userController.getUsers)

router.route('/Register')
            .post(userController.Register)


router.route('/login')
            .post(userController.login)

module.exports = router