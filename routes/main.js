// required packages
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
// pulling specific functions "ensureAuth" out of this file "../middleware/auth"
const { ensureAuth } = require('../middleware/auth')

// Routes
router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router