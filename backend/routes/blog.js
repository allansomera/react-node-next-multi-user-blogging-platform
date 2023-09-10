const express = require('express')
const router = express.Router()
// const {time}  = require('../controllers/blogController')
const blogController = require('../controllers/blogController')

router.get('/', blogController.time)

module.exports = router
