const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/:userId', authController.protect, userController.sendNotifications)
router.get('/notifications', authController.protect, userController.getNotifications)

// router.use(authController.restrictTo('admin'))

router.get('/', authController.protect, userController.getAllUsers)
router.get('/me', authController.protect, userController.getCurrentlyLoggedInUser)
router.delete('/:id', authController.protect, userController.deleteUsers)

module.exports = router

