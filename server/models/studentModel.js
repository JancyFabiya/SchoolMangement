const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        phone: {
            type: String,
            required: [true, "Number is required"]
        },
        description: {
            type: String,
            required: [true, "Post description is required"],
        },
        clz: {
            type: String,
            required: [true, "Class detail is required"]
        },
        image: {
            type: String,
        }
    }
)


module.exports = mongoose.model("Student", studentSchema);