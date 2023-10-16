const express = require('express')
const router = express.Router()
const _ = require('lodash')
const fs = require('fs')
const formidable = require('formidable')
// const {time}  = require('../controllers/blogController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.route('/user/profile').get(
  authController.requireSignin,
  authController.authMiddleware,
  // authController.adminMiddleware,
  userController.read
)

router.route('/users').get(userController.all_users)

router.route('/user/:username').get(userController.publicProfile)

router
  .route('/user/update')
  .put(
    authController.requireSignin,
    authController.authMiddleware,
    userController.update_profile
  )

router.route('/user/photo/:username').get(userController.photo)

module.exports = router
