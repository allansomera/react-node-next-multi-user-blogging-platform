const express = require('express')
// const { requireSignin } = require('../controllers/authController')
const router = express.Router()
// const {time}  = require('../controllers/blogController')
const categoryController = require('../controllers/categoryController')
const authController = require('../controllers/authController')

//validators
const { runValidation } = require('../validators') // you dont need to put index.js here
const { categoryCreateValidator } = require('../validators/category')

router
  .route('/category')
  .post(
    categoryCreateValidator,
    runValidation,
    authController.requireSignin,
    authController.adminMiddleware,
    categoryController.create
  )

router.get('/categories', categoryController.list)
router.get('/category/:slug', categoryController.read) // access with req.params
router.delete(
  '/category/:slug',
  authController.requireSignin,
  authController.adminMiddleware,
  categoryController.remove
)

module.exports = router
