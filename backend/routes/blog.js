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

// router.route('/blog/:slug').get()

router.route('/blogs').get(blogController.list)

module.exports = router
