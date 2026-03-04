import User from "../Model/userModal";
import jwt from "jsonwebtoken";

const cookieSettings = { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3600000 }

export const registerUser = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ username});
        const emailExists = await User.findOne({ email});
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new User({
            username,
            email,
            password,
            avatar: req.body.avatar || ""
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};


export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.cookie("token", token, cookieSettings);

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error });
    }
};

export const logoutUser = async (req: any, res: any) => {
    try {
        res.clearCookie("token", cookieSettings);
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error });
    }
};