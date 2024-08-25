const express = require('express')
const router = express.Router();
const authController = require('../controllers/authControllers')
const verifyToken = require('../middleware/verifyToken')
const {verifyRole} = require('../controllers/authControllers')


router.route('/Register')
            .post(authController.Register)

router.route('/forgetpassword')
            .post(authController.forgetpassword)

router.route('/login')
            .post(authController.login)

module.exports = router