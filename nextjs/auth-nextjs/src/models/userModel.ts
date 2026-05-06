import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provice a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provice an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provice a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    refreshToken: String,
    refreshTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
