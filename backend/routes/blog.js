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

router
  .route('/blog/:slug')
  .get(blogController.singleBlog)
  .delete(
    authController.requireSignin,
    authController.adminMiddleware,
    blogController.remove
  )
  .put(
    authController.requireSignin,
    authController.adminMiddleware,
    blogController.update
  )

router.route('/blogs').get(blogController.list)
router
  .route('/blogs-categories-tags')
  .post(blogController.listAllBlogsCategoriesTags)

router.route('/blog/photo/:slug').get(blogController.photo)
module.exports = router
