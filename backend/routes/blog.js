const express = require('express')
const router = express.Router()
// const {time}  = require('../controllers/blogController')
const blogController = require('../controllers/blogController')
const authController = require('../controllers/authController')

router
  .route('/blog')
  .post(
    authController.requireSignin,
    authController.adminMiddleware,
    blogController.create
  )

module.exports = router
