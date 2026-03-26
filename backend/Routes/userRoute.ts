import { registerUser, loginUser, updateUser, deleteUser, logoutUser, getMe } from './../Controller/userController';
import { authenticateToken } from '../Middleware/authentication';
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);
router.post("/logout", logoutUser);
router.get("/me", authenticateToken, getMe);


export default router;