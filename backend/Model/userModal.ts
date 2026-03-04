import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dru7e6cnq/image/upload/v1772469098/default-profile-picture1_xdypkl.jpg"
    }
}, {timestamps: true});

const userModal = mongoose.model("User", userSchema);

export default userModal;