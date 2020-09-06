const express = require('express')
const postController = require('../controllers/postController')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/', authController.protect, postController.createPosts)
router.patch('/:id', postController.updatePosts)

// router.use(authController.restrictTo('admin'))

router.get('/', postController.getAllPosts)
router.delete('/:id', postController.deletePosts)

module.exports = router