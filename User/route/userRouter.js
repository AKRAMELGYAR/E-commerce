const express = require('express')
const router = express.Router();
const userController = require('../../User/controller/userController')
const verifyToken = require('../../middleware/verifyToken')
const {verifyRole} = require('../../Auth/controller/authControllers')

router.route('/')
            .get(verifyToken,verifyRole("admin"),userController.getUsers)

router.route('/update')
            .patch(verifyToken , userController.updateUser)

router.route('/delete')
            .delete(verifyToken , userController.deleteUser)


module.exports = router