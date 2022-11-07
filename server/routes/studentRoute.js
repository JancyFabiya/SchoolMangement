const express = require('express');
const {addUser} = require('../controllers/studentController')
const authMiddleware = require("../middlewares/auth/authMiddleware")
const {pictureUpload,postImageResize} = require("../middlewares/uploads/photoUpload")
const studentRoutes = express.Router()

studentRoutes.post("/",authMiddleware,pictureUpload.single('image'),postImageResize,addUser)



module.exports = studentRoutes