const express = require('express')
const { requireSignIn } = require('../middleware/authMiddleware')
const { createUserController, getAllUsers, updateUserController, deleteUserController, searchUserController } = require('../controllers/userController')
const router = express.Router()

router.post('/create-user', requireSignIn, createUserController)

router.get('/get-users', requireSignIn, getAllUsers)

router.put('/update-user/:id', requireSignIn, updateUserController)

router.delete('/delete-user/:id', requireSignIn, deleteUserController)

router.get('/search', requireSignIn, searchUserController)


module.exports = router