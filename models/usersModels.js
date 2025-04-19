const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        trim:true,
        unique: [true,'Email must be unique'],
        minLength: [6,'Email must be at least 6 characters'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        trim: true,
        select:false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationCodeValidation:{
        type: Number,
        select: false,
    },
    forgotPasswordCode: {
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
    resetPasswordTokenExpiration: {
        type: Date,
        select: false,
    },
}
, {
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);