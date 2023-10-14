const express = require('express')
const router = express.Router()
// const {time}  = require('../controllers/blogController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.route('/profile').get(
  authController.requireSignin,
  authController.authMiddleware,
  // authController.adminMiddleware,
  userController.read
)

router.route('/users').get(userController.all_users)

router.route('/user/:username').get(userController.publicProfile)

module.exports = router
