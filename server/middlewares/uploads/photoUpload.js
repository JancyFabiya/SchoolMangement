const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
// storage
const multerStorage = multer.memoryStorage();

// file type checking
const multerFilter = (req, file, cb) => {
    //check file type
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        //rejected files
        cb(
            {
                message: "Unsupported file format",
            },
            false
        );
    }
};

const pictureUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 },
});

// Image Resizing for post images
const postImageResize = async (req, res, next) => {
    //check if there is no file
    console.log(req.file, req.body);
    if (!req.file) return next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer)
        //   .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(`public/images/${req.file.filename}`));
    next();
};





module.exports = { pictureUpload, postImageResize }