const express = require('express')
const dotenv=require('dotenv').config()
const cors = require("cors");
const dbConnect = require('./config/db/dbConnection')
const userRoutes = require('./routes/userRoute');
const studentRoutes = require('./routes/studentRoute')





const app = express()


// Middleware
app.use(express.json())

//cors
app.use(cors());

// User's Route
app.use('/api/users',userRoutes)

// Student Route
app.use('/api/students',studentRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is Running ${PORT}`))