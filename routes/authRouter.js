const express = require('express')
const router = express.Router();
const authController = require('../controllers/authControllers')
const uploads = require('../middleware/multer')


router.route('/Register')
            .post(uploads.single('avatar'),authController.Register)

router.route('/forgetpassword')
            .post(authController.forgetpassword)

router.route('/login')
            .post(authController.login)

module.exports = router