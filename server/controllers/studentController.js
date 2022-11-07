const expressAsyncHandler = require("express-async-handler");
const Student = require('../models/studentModel');
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");



// Add student

const addUser = expressAsyncHandler(async (req, res) => {
    const localPath = `public/images/${req.file.filename}`
    const imgUploaded = await cloudinaryUploadImg(localPath)
    console.log('cloud',imgUploaded);
    console.log(req.body.name)
    try{
    const student = await Student.create({
               ...req.body,
        image: imgUploaded?.url,
    });
    // console.log(student)
    res.json(student)
    // fs.unlinkSync(localPath);

}catch (error) {
    res.json(error)
}
})



module.exports = {
    addUser
}