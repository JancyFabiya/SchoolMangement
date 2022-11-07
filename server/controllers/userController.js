const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const nodemailer = require("nodemailer")
const generateToken = require("../config/token/generateToken")








// User Registration
const userRegister = expressAsyncHandler(async (req, res) => {
    // Check if user is already registered
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) throw new Error("User Already registered");
    console.log(req.body);
    try {

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});



// User Login
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check if user exists
    const userFound = await User.findOne({ email });


    //Check if password is match
    if (userFound && (await userFound.isPasswordMatched(password))) {
        res.json({
            _id: userFound?._id,
            name: userFound?.name,
            email: userFound?.email,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
            isVerified: userFound?.isAccountVerified,
        });
    } else {
        res.status(401);
        throw new Error("Invalid Login Credentials");
    }
});





module.exports = {
    userRegister,
    loginUser
};