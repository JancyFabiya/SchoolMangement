const express = require('express');
const {userRegister,loginUser} = require('../controllers/userController')

const userRoutes = express.Router()
userRoutes.post('/register',userRegister)
userRoutes.post('/login',loginUser)




module.exports = userRoutes