const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["Admin", "Staff", "Student"],
        }
    }
)


//Hash Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match Password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};





module.exports = mongoose.model("User", userSchema);
