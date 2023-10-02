const express = require('express')

const router = express.Router()

const tagController = require('../controllers/tagController')
const authController = require('../controllers/authController')

//validators
const { runValidation } = require('../validators') // you dont need to put index.js here
const { tagCreateValidator } = require('../validators/tag')

router
  .route('/tag')
  .post(
    tagCreateValidator,
    runValidation,
    authController.requireSignin,
    authController.adminMiddleware,
    tagController.create
  )

router
  .route('/tag/:slug')
  .get(tagController.read)
  .delete(
    authController.requireSignin,
    authController.adminMiddleware,
    tagController.remove
  )

router.route('/tags').get(tagController.listTags)

module.exports = router
