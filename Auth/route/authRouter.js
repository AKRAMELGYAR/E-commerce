const express = require('express')
const router = express.Router();
const authController = require('../../Auth/controller/authControllers')
const uploads = require('../../middleware/multer')
const validateUser = require('../../middleware/validateUser')

router.route('/Register')
            .post(uploads.single('avatar'),validateUser,authController.Register)

router.route('/forgetpassword')
            .post(authController.forgetpassword)

router.route('/login')
            .post(authController.login)

module.exports = router