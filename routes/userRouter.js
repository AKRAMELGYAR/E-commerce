const express = require('express')
const router = express.Router();
const userController = require('../controllers/authControllers')


router.route('/Register')
            .post(userController.Register)


router.route('/login')
            .post(userController.login)

module.exports = router