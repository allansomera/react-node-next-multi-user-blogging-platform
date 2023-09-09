const express = require('express')
const router = express.Router()
// const {time}  = require('../controllers/blogController')
const authController = require('../controllers/authController')

// validators

const { runValidation } = require('../validators') // you dont need to put index.js here
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')

router
  .route('/signup')
  .post(userSignupValidator, runValidation, authController.signup)
// router.post(
//   '/signup',
//   userSignupValidator,
//   runValidation,
//   authController.signup
// )
router
  .route('/signin')
  .post(userSigninValidator, runValidation, authController.signin)

module.exports = router
